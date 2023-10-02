from pydantic import BaseModel


class AcademicLoad(BaseModel):
    teacher_id: int
    student_id: int
    topic: str 
    description: str 
    since_date: date 
    until_date: date
