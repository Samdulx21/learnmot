from fastapi import APIRouter, HTTPException, Depends
# import jwt
# from jwt import PyJWTError, ExpiredSignatureError
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from controllers.UserController import *

# SECRET_KEY = "SAMOIJUDL23449DSAKZV7"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

users = UserController()

# def create_jwt(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# @router.post("/login/signin")
# async def login_user(login_item: UserLogin):
#     try:
#         user_validation_result = users.validation(login_item)

#         if "email" in user_validation_result and "user_pass" in user_validation_result:
#             access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#             encode_jwt = create_jwt(data={'sub': user_validation_result["name"]}, expires_delta=access_token_expires)
#             return {'token': encode_jwt, 'token_type': 'bearer'}
#         else:
#             raise HTTPException(status_code=401, detail="Login failed")
#     except PyJWTError:  
#         raise HTTPException(status_code=500, detail="Error generating token")
                            
# @router.get("/user")
# async def get_authenticated_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="/login/signin"))):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         user_data = users.validation(username)
#         if user_data is None:
#             raise HTTPException(status_code=404, detail="User not found.")
#         return user_data
#     except ExpiredSignatureError:  
#         raise HTTPException(status_code=401, detail="Token has expired")
#     except PyJWTError:  
#         raise HTTPException(status_code=401, detail="Error generating token")
    
    #     payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    #     username: str = payload.get("sub")
    #     user_data = users.validation(username)
    #     if user_data is None:
    #         raise HTTPException(status_code=404, detail="User not found.")
    #     return user_data
    # except jwt.exception.PyJWTError:
    #     raise HTTPException(status_code=401, detail="Error generatig token")

@router.get("/list/users")
async def get_users():
    response = users.get_users()
    return response

@router.post("/insert/user")
async def insert_user(newuser: User):
    response = users.insert_user(newuser)
    return response

@router.put("/update/user/{id}")
async def update_user(id: int, newuser: User):
    response = users.update_user(id, newuser)
    return response

@router.delete("/delete/user/{id}")
async def delete_user(id: int):
    response = users.delete_user(id)
    return response    



# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# @router.post("/login/signin")
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), ):
#     db = next(get_db_connection())
#     user = users.get_user_signin(db, form_data.username)
#     if not user or not users.verify_password(form_data.password, user.hashed_password):
#         raise HTTPException(status_code=400, detail="Credenciales incorrectas")
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(data={"sub": user.name}, expires_delta=access_token_expires)
#     return {"access_token": access_token, "token_type": "bearer"}

# # Ruta protegida que requiere autenticación
# @router.get("/user/me")
# async def obtener_usuario_autenticado(token: str = Depends(OAuth2PasswordBearer(tokenUrl="login"))):
    # try:
    #     payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    #     username: str = payload.get("sub")
    #     db = next(get_db_connection())
    #     user = get_user(db, username)
    #     if user is None:
    #         raise HTTPException(status_code=404, detail="Usuario no encontrado")
    #     return user
    # except JWTError:
    #     raise HTTPException(status_code=401, detail="No se pudo validar el token")

# def create_jwt(data):
#     encode_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
#     return encode_jwt