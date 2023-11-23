from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
import pymysql

app = FastAPI()

# Configuración para encriptación de contraseñas
SECRET_KEY = "tu_clave_secreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Conexión a la base de datos MySQL
def get_db():
    connection = pymysql.connect(
        host="tu_host",
        user="tu_usuario",
        password="tu_contraseña",
        db="tu_base_de_datos",
        cursorclass=pymysql.cursors.DictCursor,
    )
    try:
        yield connection
    finally:
        connection.close()

# Modelo de usuario (sustituye con tu propia definición)
class Usuario(BaseModel):
    IdUsuario: int
    Nombre: str
    Apellido: str
    IdTipoUsuario: int
    TipoDocumento: str
    NumeroDocumento: str
    CorreoElectronico: str
    Telefono: str
    Genero: str
    Contraseña: str

# Modelo de usuario para almacenamiento en base de datos
class UsuarioDB(Usuario):
    hashed_password: str

# Clase de autenticación
class TokenData(BaseModel):
    username: str | None = None

# Clase para validar contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Obtener usuario de la base de datos
def get_user(db, username: str):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE Nombre = %s", username)
    user = cursor.fetchone()
    if user:
        return UsuarioDB(**user)

# Validar contraseña
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Crear token JWT
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Ruta de inicio de sesión
@app.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = next(get_db())
    user = get_user(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.Nombre}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# Ruta protegida que requiere autenticación
@app.get("/usuario")
async def obtener_usuario_autenticado(token: str = Depends(OAuth2PasswordBearer(tokenUrl="login"))):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        db = next(get_db())
        user = get_user(db, username)
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="No se pudo validar el token")

if _name_ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)