import mysql.connector
from fastapi import HTTPException
from config.database_config import get_db_connection
from models.ModelObservation import Observation
from fastapi.encoders import jsonable_encoder


#CRUD observation
class ObservationController:

    def get_observation(self):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute("SELECT * FROM observation")
            response = db.fetchall()
            payload = []
            content = {}
            for item in response:
                content = {
                    'academic_load_id': item[0],
                    'observation_desc': item[1]
                }
                payload.append(content)
                content = {}
            json_data = jsonable_encoder(payload)
            if response:            
                return {"result": json_data}
            else:
                raise HTTPException(status_code=404, detail="User not found")     
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()
        
    def insert_observation(self, observation: Observation):
        try:
            description = observation.description
            academic_load_id = observation.academic_load_id
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute("""
                    INSERT INTO observation (description, academic_load_id)
                    VALUES (%s,%s)
                """,(description, academic_load_id))
            mydb.commit()
            mydb.close()
            return {"info": "New Observation is created successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def update_observation(self, id: int, observation: Observation):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            idsql = "SELECT id FROM observation WHERE id = %s"
            db.execute(idsql,(id,))
            response = db.fetchone()
            if not response:
                db.close()
                return {"info": f"Id '{id}' not found."}
            
            description = observation.description
            academic_load_id = observation.academic_load_id
            update = """
                UPDATE observation SET 
                description = %s,
                academic_load_id = %s
                WHERE id = %s
                """
            db.execute(update,(description,academic_load_id, id))
            mydb.commit()
            mydb.close()
            return {"info":"observation updated successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def delete_observation(self, id: int):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            idsql = "SELECT id FROM observation WHERE id = %s"
            db.execute(idsql,(id,))
            response = db.fetchone()
            if not response:
                db.close()
                return {"info": f"Id '{id}' not found."}
            delete = "DELETE FROM observation WHERE id = %s"
            db.execute(delete,(id,))
            mydb.commit()
            db.close()
            return {"info": "observation load removed successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()
