import mysql.connector
from fastapi import HTTPException
from config.database_config import get_db_connection
from models.ModelUsers import User
from fastapi.encoders import jsonable_encoder


# CRUD Users
class UserController:

    def get_users(self):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute("SELECT * FROM users")
            response = db.fetchall()
            payload = []
            content = {} 
            for item in response:
                content={
                    'id':item[0],
                    'name':item[1],
                    'last_name':item[2],
                    'sex':item[3],
                    'role':item[4],
                    'email':item[5],
                    'password':item[6],
                }
                payload.append(content)
                content = {}
            print(payload)
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

    def insert_user(self, newuser: User):
        try:
            name = newuser.name
            last_name = newuser.last_name
            sex = newuser.sex
            role = newuser.role
            email = newuser.email
            password = newuser.password
            mydb = get_db_connection()
            db = mydb.cursor() 
            db.execute("""
                    INSERT INTO users(name,last_name,sex,role,email,password) VALUES(%s,%s,%s,%s,%s,%s)""",
                    (name,last_name,sex,role,email,password))
            mydb.commit()
            mydb.close()
            return {"info":"User create successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def update_user(self, id: int, updateuser: User):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            idsql = "SELECT id FROM users WHERE id = %s"
            db.execute(idsql,(id,))
            response = db.fetchone()
            if not response:
                db.close()
                return {"info": f"Id '{id}' not found."}
            name = updateuser.name
            last_name = updateuser.last_name
            sex = updateuser.sex
            role = updateuser.role
            email = updateuser.email
            password = updateuser.password
            update = """
                UPDATE users SET
                name = %s,
                last_name = %s,
                sex = %s,
                role = %s,
                email = %s,
                password = %s
                WHERE id = %s
            """
            db.execute(update,(name,last_name,sex,role,email,password, id))
            mydb.commit()
            mydb.close()
            return {"info":"User updated successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def delete_user(self, id: int):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            idsql = "SELECT id FROM users WHERE id = %s"
            db.execute(idsql, (id,))
            response = db.fetchone()
            if not response:
                db.close()
                return {"info": f"Id '{id}' not found."}
            delete = "DELETE FROM users WHERE id = %s"
            db.execute(delete, (id,))
            mydb.commit()
            mydb.close()
            return {"infor":"User deleted successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()
