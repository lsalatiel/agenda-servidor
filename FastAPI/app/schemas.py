from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    id: str
    name: str
    password: str
    email: EmailStr
    type: str = "student"
    course: Optional[str] = "None" # Optional

class ScheduleCreate(BaseModel):
    area_id: int
    user_id: str
    start_time: datetime
    end_time: datetime

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    type: str
    course: str = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class AreaResponse(BaseModel):
    id: int
    name: str

class ScheduleResponse(BaseModel):
    id: int
    area: AreaResponse
    user: UserResponse
    start_time: datetime
    end_time: datetime
    created_at: datetime