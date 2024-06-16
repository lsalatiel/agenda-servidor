import datetime
from pydantic import BaseModel, EmailStr

# model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    name: str
    password: str
    email: EmailStr

class StudentCreate(UserCreate):
    course: str

class AssociateCreate(UserCreate):
    pass

class ScheduleCreate(BaseModel):
    area_id: int
    user_id: int
    user_type: str  # 'student' or 'associate'
    start_time: datetime
    end_time: datetime

class StudentResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    course: str
    created_at: datetime

class AssociateResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

class AreaResponse(BaseModel):
    id: int
    name: str

class ScheduleResponse(BaseModel):
    id: int
    area: AreaResponse
    user: BaseModel # StudentResponse or AssociateResponse
    user_type:str
    start_time: datetime
    end_time: datetime
    created_at: datetime