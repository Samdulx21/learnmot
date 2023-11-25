from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import mysql.connector
from fastapi.encoders import jsonable_encoder
from config.database_config import get_db_connection

router = APIRouter()

class Pqr(BaseModel):
    num_id: int
    phone: int
    description: str


def get_pqr():
    try:
        mydb = get_db_connection()
        db = mydb.cursor()
        db.execute("SELECT p.num_id, p.phone, p.description FROM pqr as p")
        response = db.fetchall()
        payload = []
        content = {} 
        for item in response:
            content={
                'num_id':item[0],
                'phone':item[1],
                'description':item[2],
            }
            payload.append(content)
            content = {}
        # print(payload)
        json_data = jsonable_encoder(payload)
        if response:            
            return {"result": json_data}
        else:
            raise HTTPException(status_code=404, detail="pqr not found")     
    except mysql.connector.Error as err:
        mydb.rollback()
        return {"error": err}
    finally:
        mydb.close()

def insert_pqr(newpqr: Pqr):
    try:
        num_id = newpqr.num_id
        phone = newpqr.phone
        description = newpqr.description
        mydb = get_db_connection()
        db = mydb.cursor() 
        db.execute("""
                INSERT INTO pqr(num_id,phone,description) VALUES(%s,%s,%s)""",
                (num_id, phone, description))
        mydb.commit()
        mydb.close()
        return {"info":"User create successfully."}
    except mysql.connector.Error as err:
        mydb.rollback()
        return {"error": err}
    finally:
        mydb.close()


@router.get("/list/pqr")
async def get_route():
    response = get_pqr()
    return response

@router.post("/insert/pqr")
async def get_route_insert(newpqr: Pqr):
    response = insert_pqr(newpqr)
    return response