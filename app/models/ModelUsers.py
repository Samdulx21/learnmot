from pydantic import BaseModel
# from enum import Enum

class User(BaseModel):
    name: str 
    last_name: str 
    sex: str
    role: str 
    email: str
    password: str 

class UserLogin(BaseModel):
    email: str
    password: str

# class SelectRole(str, Enum):
#     Admin = 'admin'
#     Teacher = 'teacher'
#     Student = 'student'

# class Sex(str, Enum):
#     Male = 'male'
#     Female = 'female' 