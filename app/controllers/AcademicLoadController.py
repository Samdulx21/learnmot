import mysql.connector
from fastapi import HTTPException
from config.database_config import get_db_connection
from models.ModelAcademicLoad import AcademicLoad
from fastapi.encoders import jsonable_encoder


# CRUD Academic Load
class AcademicLoadController():
    
    def get_academic_load(self):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute("SELECT * FROM academic_load")
            response = db.fetchall()
            payload = []
            content = {}
            for item in response:
                content = {
                    "idTeacher": item[0],
                    "idStudent": item[1],
                    "topic": item[2],
                    "description": item[3],
                    "since_date": item[4],
                    "until_date": item[5]
                }
                payload.append(content)
                content = {}
            json_data = jsonable_encoder(payload)
            return {"result": json_data}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def get_academic_load_by_teacher(self, id: int):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute(""" 
                        SELECT 
                            al.toppic as name, 
                            al.description,
                            al.since_date,
                            al.until_date
                        FROM academic_load as al
                        WHERE al.teacher_id = %s
                        """, (id,))
            response = db.fetchall()
            payload = []
            content = {}
            for item in response:
                content = {
                    "name": item[0],
                    "description": item[1],
                    "since_date": item[2],
                    "until_date": item[3],
                }
                payload.append(content)
                content = {}
            json_data = jsonable_encoder(payload)
            return {"result": json_data}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def get_students(self, id: int):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute(""" 
                        SELECT 
                            al.toppic,
                            u.name, 
                            u.last_name,
                            u.email
                        FROM academic_load as al
                        JOIN users u
                        ON u.id = al.student_id
                        WHERE al.teacher_id = %s
                        """, (id,))
            response = db.fetchall()
            payload = []
            content = {}
            for item in response:
                content = {
                    "toppic": item[0],
                    "name": item[1],
                    "last_name": item[2],
                    "email": item[3],
                }
                payload.append(content)
                content = {}
            json_data = jsonable_encoder(payload)
            return {"result": json_data}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def insert_academic_load(self, academic: AcademicLoad):
        try: 
            teacher_id = academic.teacher_id
            student_id = academic.student_id
            topic = academic.topic
            description = academic.description
            since_date = academic.since_date
            until_date = academic.until_date
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute("""
                    INSERT INTO academic_load 
                    (teacher_id, student_id, topic, description, since_date, until_date)
                    VALUES (%s,%s,%s,%s,%s,%s)
                """,(teacher_id, student_id, topic, description, since_date, until_date))
            mydb.commit()
            mydb.close()
            return {"info": "Academic load created successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def update_academic_load(self, id: int, academic: AcademicLoad):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            idsql = "SELECT id FROM academic_load WHERE id = %s"
            db.execute(idsql,(id,))
            response = db.fetchone()
            if not response:
                db.close()
                return {"info": f"Id '{id}' not found."}
            
            teacher_id = academic.teacher_id
            student_id = academic.student_id
            topic = academic.topic
            description = academic.description
            since_date = academic.since_date
            until_date = academic.until_date
            update = """
                UPDATE academic_load SET 
                teacher_id = %s,
                student_id = %s,
                topic = %s,
                description = %s,
                since_date = %s,
                until_date = %s
                WHERE id = %s
                """
            db.execute(update,(teacher_id, student_id, topic, description, since_date, until_date, id))
            mydb.commit()
            mydb.close()
            return {"info":"Academic load updated successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def delete_academic_load(self, id: int):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            idsql = "SELECT id FROM academic_load WHERE id = %s"
            db.execute(idsql,(id,))
            response = db.fetchone()
            if not response:
                db.close()
                return {"info": f"Id '{id}' not found."}
            delete = "DELETE FROM academic_load WHERE id = %s"
            db.execute(delete,(id,))
            mydb.commit()
            mydb.close()
            return {"info": "Academic load removed successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()
