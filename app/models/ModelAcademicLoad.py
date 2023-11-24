from pydantic import BaseModel
from datetime import date


class AcademicLoad(BaseModel):
    teacher_id: int
    student_id: int
    topic: str 
    description: str 
    since_date: date 
    until_date: date
