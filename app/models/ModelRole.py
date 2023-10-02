from pydantic import BaseModel

class Role(BaseModel):
    name: str 
    description: str 
