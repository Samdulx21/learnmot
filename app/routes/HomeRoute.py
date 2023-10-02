from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
async def root():
    return {"msg": "Welcome to new project in FastApi. :D"}