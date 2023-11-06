from pydantic import BaseModel
# from enum import Enum

class User(BaseModel):
    name: str 
    last_name: str 
    sex: str
    role: str 
    email: str
    user_pass: str 

class UserLogin(BaseModel):
    email: str
    user_pass: str

# class SelectRole(str, Enum):
#     Admin = 'admin'
#     Teacher = 'teacher'
#     Student = 'student'

# class Sex(str, Enum):
#     Male = 'male'
#     Female = 'female' 