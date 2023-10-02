from pydantic import BaseModel

class Subject(BaseModel):
    name: str 
    name_code: str
    description: str 
