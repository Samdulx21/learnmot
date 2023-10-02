from pydantic import BaseModel

class Attribute(BaseModel):
    name: str 
    description: str
