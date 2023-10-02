from pydantic import BaseModel

class Observation(BaseModel):
    description: str
    academic_load_id: int
