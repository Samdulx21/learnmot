from fastapi import APIRouter, HTTPException, Request
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="../static/templates")

@router.get("/")
async def root():
    return {"msg": "Welcome to new project in FastApi. :D"}

@router.get("/home")
async def index(request: Request):
    return templates.TemplateResponse("base.html",{"request": request})