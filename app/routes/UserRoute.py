from fastapi import APIRouter, HTTPException, Request
from controllers.UserController import *
from fastapi.responses import HTMLResponse
from models.ModelUsers import User
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import json

router = APIRouter()

users = UserController()

templates = Jinja2Templates(directory="../static/templates")

@router.get("/list/users", response_class=HTMLResponse)
async def get_users(request: Request):
    response = users.get_users()
    return templates.TemplateResponse("users.html",{"request": request, "response": response})

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