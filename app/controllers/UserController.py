import mysql.connector
import jwt
from fastapi import HTTPException
from config.database_config import get_db_connection
from models.ModelUsers import User, EditUser
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
                    'email':item[4],
                    'user_pass':item[5],
                }
                payload.append(content)
                content = {}
            # print(payload)
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

    def get_users_by_role(self):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()
            db.execute("""
                        SELECT u.id, u.name, u.last_name, COALESCE(r.description, null) as role, u.sex, u.email 
                        FROM 
                            users u
                        LEFT JOIN
                            role_users ru ON u.id = ru.user_id
                        LEFT JOIN
                            roles r ON ru.role_id = r.id;
                       """)
            response = db.fetchall()
            payload = []
            content = {} 
            for item in response:
                content={
                    'id': item[0],
                    'name':item[1],
                    'last_name':item[2],
                    'role':item[3],
                    'sex':item[4],
                    'email':item[5],
                }
                payload.append(content)
                content = {}
            # print(payload)
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
            email = newuser.email
            user_pass = newuser.user_pass
            mydb = get_db_connection()
            db = mydb.cursor() 
            db.execute("""
                    INSERT INTO users(name,last_name,sex,email,user_pass) VALUES(%s,%s,%s,%s,%s)""",
                    (name,last_name,sex,email,user_pass))
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
            email = updateuser.email
            update = """
                UPDATE users SET
                name = %s,
                last_name = %s,
                role = %s,
                sex = %s,
                email = %s
                WHERE id = %s
            """
            db.execute(update,(name,last_name,sex,email, id))
            mydb.commit()
            mydb.close()
            return {"info":"User updated successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            return {"error": err}
        finally:
            mydb.close()

    def update_user_insert_role(self, id: int, role_id: int, updateuser: EditUser):
        try:
            mydb = get_db_connection()
            db = mydb.cursor()


            idsql = "SELECT id FROM users WHERE id = %s"
            db.execute(idsql, (id,))
            user_exists = db.fetchone()

            if not user_exists:
                raise HTTPException(status_code=404, detail=f"User with ID '{id}' not found.")

 
            update_user_query = """
                UPDATE users SET
                name = %s,
                last_name = %s,
                sex = %s,
                email = %s
                WHERE id = %s
            """
            db.execute(update_user_query, (updateuser.name, updateuser.last_name, updateuser.sex, updateuser.email, id))

  
            role_user_query = """
                INSERT INTO role_users (role_id, user_id)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE role_id = VALUES(role_id)
            """
            db.execute(role_user_query, (role_id, id))

            mydb.commit()
            return {"info": "User and role updated successfully."}
        except mysql.connector.Error as err:
            mydb.rollback()
            raise HTTPException(status_code=500, detail=f"Database error: {err}")
        finally:
            db.close()
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