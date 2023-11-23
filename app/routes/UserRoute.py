from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from controllers.UserController import *
from models.ModelUsers import User, EditUser

router = APIRouter()

users = UserController()

@router.get("/list/users")
async def get_users():
    response = users.get_users()
    return response

@router.post("/insert/user")
async def insert_user(newuser: User):
    response = users.insert_user(newuser)
    return response

@router.put("/update/user/{id}")
async def update_user(id: int, newuser: EditUser):
    response = users.update_user(id, newuser)
    return response

@router.delete("/delete/user/{id}")
async def delete_user(id: int):
    response = users.delete_user(id)
    return response    
