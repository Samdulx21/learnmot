from fastapi import APIRouter, HTTPException, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

router = APIRouter()

templates = Jinja2Templates(directory="../static/templates/home")

@router.get("/")
async def root():
    return {"msg": "Welcome to new project in FastApi. :D"}

@router.get("/home", response_class=HTMLResponse)
async def read_root(request: Request):
    # Renderiza una plantilla HTML utilizando Jinja2
    return templates.TemplateResponse("home.html", {"request": request})