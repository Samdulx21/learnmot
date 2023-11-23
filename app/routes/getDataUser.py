from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from config.database_config import get_db_connection
from models.ModelUsers import User


def get_db():
    db = get_db_connection()
    return db

# Ruta para guardar los datos en la base de datos
@app.post("/save-user-data/{user_id}")
async def save_user_data(user_id: int):
    try:
        # Obtener los datos del usuario desde localStorage
        db = get_db()
        user_data_str = localStorage.getItem("useredit")
        if not user_data_str:
            raise HTTPException(status_code=400, detail="Datos de usuario no encontrados en localStorage")

        user_data = json.loads(user_data_str)

        # Guardar los datos en la base de datos
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO users (id, name, last_name, sex, email, user_pass) VALUES (%s, %s, %s, %s, %s, %s)",
            (user_id, user_data["name"], user_data["last_name"], user_data["sex"], user_data["email"], user_data["user_pass"])
        )
        db.commit()
        cursor.close()

        return JSONResponse(content={"message": "Datos de usuario guardados correctamente"}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    finally:
        db.close()