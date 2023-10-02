from fastapi import APIRouter, HTTPException
from controllers.ObservationController import *
from models.ModelObservation import Observation

router = APIRouter()

obsarvation = ObservationController()


@router.get("/list/observation")
async def get_observation():
    response = obsarvation.get_observation()
    return response

@router.post("/insert/observation")
async def insert_observation(newobservation: Observation):
    response = obsarvation.insert_observation(newobservation)
    return response

@router.put("/updated/observation/{id}")
async def updated_observation(id: int, newobservation: Observation):
    response = obsarvation.update_observation(id, newobservation)
    return response

@router.delete("/delete/observation/{id}")
async def delete_observation(id: int):
    response =  obsarvation.delete_observation(id)
    return response