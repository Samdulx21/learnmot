from fastapi import APIRouter, HTTPException
from controllers.AcademicLoadController import *
from models.ModelAcademicLoad import AcademicLoad

router = APIRouter()

academicload = AcademicLoadController()

@router.get("/list/academicload")
async def get_academic_load():
    response = academicload.get_academic_load()
    return response

@router.get("/topic/academicload/{id}")
async  def get_list_academic(id: int):
    response = academicload.get_academic_load_by_teacher(id)
    return response

@router.get("/table/students/{id}")
async  def get_list_academic(id: int):
    response = academicload.get_students(id)
    return response

@router.get("/table/teachers/{id}/{status}")
async  def get_list_academic(id: int, status: int):
    response = academicload.get_teachers(id, status)
    return response

@router.put("/update/status/{id}")
async  def get_list_academic(id: int, status: int):
    response = academicload.updated_status(id, status)
    return response

@router.post("/insert/academicload")
async def insert_academic_load(newacademicload: AcademicLoad):
    response = academicload.insert_academic_load(newacademicload)
    return response

@router.put("/update/academicload/{id}")
async def updated_academic_load(id: int, newacademic: AcademicLoad):
    response = academicload.update_academic_load(id, newacademic)
    return response

@router.delete("/delete/academicload/{id}")
async def delete_academic_load(id: int):
    response = academicload.delete_academic_load(id)
    return  response
