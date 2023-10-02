from fastapi import FastAPI
# from typing import Union
from datetime import date
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.middleware.gzip  import GZipMiddleware
from routes import UserRoute, HomeRoute, ObservationRoute
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="../static"), name="static")

origins = [
    #"http://localhost.tiangolo.com",
    #"https://localhost.tiangolo.com",
    "http://localhost"
    #"http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(HomeRoute.router)
app.include_router(UserRoute.router)
app.include_router(ObservationRoute.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


#  --------------------------------------------------------------
# get method using inner joins on two tables and clausule where
@app.get("/filter/observation/academicload/{id}")
def get_observation_academicload(id: int):
    try:
        db = mydb.cursor()
        query = """
            SELECT o.description, al.topic
            FROM observation as o
            JOIN academic_load as al
            ON o.academic_load_id = al.id
            WHERE al.teacher_id = %s
        """
        db.execute(query, (id,))
        response = db.fetchall()
        db.close()
        return {"result": response}
    except Exception as error:
        return {"error":error}
    
@app.get("/filter/users/academicload/{id}")
def get_observation_academicload(id: int):
    try:
        db = mydb.cursor()
        query = """
            SELECT u.name, u.sex, al.topic
            FROM users as u
            JOIN academic_load as al
            ON u.id = al.student_id
            WHERE al.student_id = %s
        """
        db.execute(query, (id,))
        response = db.fetchall()
        db.close()
        return {"result": response}
    except Exception as error:
        return {"error":error}


# get method using inner joins on three tables
@app.get("/filter/users/academicload/observation/{id}")
def get_users_observation(id: int):
    try:
        db = mydb.cursor()
        query = """
            SELECT u.name, al.topic, o.description
            FROM users as u
            JOIN academic_load as al 
            ON u.id = al.student_id
            JOIN observation as o
            ON al.id = o.academic_load_id
            WHERE u.id = %s
        """
        db.execute(query,(id,))
        response = db.fetchall()
        db.close()
        return {"result":response}
    except Exception as error:
        return {"error":error}
    
@app.get("/filter/users/role/academicload/{id}")
def get_users_observation(id: int):
    try:
        db = mydb.cursor()
        query = """
            SELECT u.name, al.topic, r.description
            FROM users as u
            JOIN role_users as ru
            ON u.id = ru.user_id
            JOIN roles r
            ON ru.role_id = r.id
            JOIN academic_load as al 
            ON u.id = al.teacher_id
            WHERE u.id = %s
        """
        db.execute(query,(id,))
        response = db.fetchall()
        db.close()
        return {"result":response}
    except Exception as error:
        return {"error":error}


# delete method using clause "like"
@app.delete("/deletelike/users/{name}")
def deletelike(name: str):
    try:
        db = mydb.cursor()
        idsql = "SELECT id FROM users WHERE name LIKE %s"
        db.execute(idsql,(f"%{name}%",))
        response = db.fetchone()
        if not response:
            db.close()
            return {"info": f"No value was found '{name}'"}
        namesql = ("DELETE FROM users WHERE name LIKE %s")
        db.execute(namesql,(f"%{name}%",))
        mydb.commit()
        db.close()
        return {"info": f"User '{name}' removed successful."}
    except Exception as error:
        return {"result":error}

# get method using clause "count"
@app.get("/users/count")
def userscount():
    try:
        db = mydb.cursor()
        count = "SELECT COUNT(*) FROM users"
        db.execute(count)
        result = db.fetchall()
        payload =  []
        content = {}
        for res in result:
            content={
                "count":res[0]
            }
            payload.append(content)
            content = {}
        db.close()
        json_data = jsonable_encoder(payload)            
        return {"result": json_data}
    except Exception as error:
        return {"result":error}


#get method using clause "sum"
@app.get("/subject/sum")
def subject_sum():
    try:
        db = mydb.cursor()
        sum = "SELECT SUM(price + iva) FROM subject"
        db.execute(sum)
        response = db.fetchall()
        payload =  []
        content = {}
        for res in response:
            content={
                "sum":res[0]
            }
            payload.append(content)
            content = {}
        db.close()
        json_data = jsonable_encoder(payload)            
        return {"result": json_data}
    except Exception as error:
        return {"result":error}
    

# get method using joins on two tables with clausule where and order by.
@app.get("/users/teacher/academicload/{id}")
def get_teacher_by_subject(id: int):
    try:
        db = mydb.cursor()
        db.execute("""
            SELECT u.id, u.name, u.last_name, al.topic
            FROM users as u 
            JOIN academic_load as al
            on u.id = al.teacher_id
            WHERE u.id = %s
            ORDER BY al.topic DESC 
        """,(id,))
        response = db.fetchall()
        db.close()       
        return {"result": response}
    except Exception as error:
        return {"result":error}
    
# get method using joins on three tables with clausule where, and o or.
@app.get("/users/al/observation/{id}/{topic}")
def get_users_academicload_observation(id: int, topic: str):
    try:
        db = mydb.cursor()
        query = """
            SELECT u.name, u.last_name, al.topic, o.description
            FROM users as u
            JOIN academic_load as al 
            ON u.id = al.student_id
            JOIN observation as o
            ON al.id = o.academic_load_id
            WHERE u.id = %s
            AND al.topic = %s
        """
        db.execute(query,(id,topic))
        response = db.fetchall()
        db.close()         
        return {"result": response}
    except Exception as error:
        return {"result":error}
