from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional
from app.utils import CPF

class UserCreate(BaseModel):
    id: CPF
    name: str
    password: str
    email: EmailStr
    type: str = "student"
    course: Optional[str] = "None" # Optional

    model_config = ConfigDict(from_attributes=True)

class Area(BaseModel):
    id: int
    name: str

class AreaCreate(Area):
    is_open: Optional[int] = 1
    pass

class ScheduleCreate(BaseModel):
    area_id: int
    user_id: CPF
    start_time: datetime
    end_time: datetime

class UserResponse(BaseModel):
    id: CPF
    name: str
    email: EmailStr
    type: str
    course: str = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class AreaResponse(Area):
    is_open: int
    pass

class ScheduleResponse(BaseModel):
    id: int
    area: AreaResponse
    user: UserResponse
    start_time: datetime
    end_time: datetime
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None