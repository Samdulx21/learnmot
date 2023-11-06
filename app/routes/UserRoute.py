from fastapi import APIRouter, HTTPException
from fastapi import Depends
import jwt
from controllers.UserController import *
from models.ModelUsers import User, UserLogin

SECRET_KEY = "SAMOIJUDL23449DSAKZV7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

router = APIRouter()

users = UserController()

@router.get("/list/users")
async def get_users():
    response = users.get_users()
    return response

@router.post("/login/signup")
async def login_user(login_item: UserLogin):
    user_validation_result = users.validation(login_item)

    if "email" in user_validation_result and "user_pass" in user_validation_result:
        encode_jwt = create_jwt(user_validation_result)
        return {'token': encode_jwt}
    else:
        raise HTTPException(status_code=401, detail="Login failed")

def create_jwt(data):
    try:
        encode_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return encode_jwt
    except jwt.PyJWTError:
        raise HTTPException(status_code=500, detail="Error generating token")
    

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