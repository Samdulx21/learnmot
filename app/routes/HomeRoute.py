from fastapi import APIRouter, HTTPException, Request
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="../static/templates")

@router.get("/")
async def root(request: Request):
    return templates.TemplateResponse("home.html",{"request": request})

# @router.get("/example")
# async def index(request: Request):
#     return templates.TemplateResponse("base.html",{"request": request})