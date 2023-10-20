from fastapi import APIRouter, HTTPException
import jwt
from controllers.UserController import *
from models.ModelUsers import User, UserLogin

SECRET_KEY = "wilbertdaniel2123456789"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

dummy_user = {
    "email": "wilbertdaniel2@gmail.com",
    "password": "123456asd",
}

router = APIRouter()

users = UserController()

@router.get("/list/users")
async def get_users():
    response = users.get_users()
    return response

@router.post("/login/sigunp")
async def login_user(login_item: UserLogin):
    data = jsonable_encoder(login_item)
    if dummy_user['email'] == data['email'] and dummy_user['password'] == data['password']:
        encode_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return {'token': encode_jwt}
    else:
        return {'message': "Login failed"}

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