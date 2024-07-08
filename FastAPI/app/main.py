from fastapi import FastAPI
from app.routers import user, schedule, area, auth
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas

@asynccontextmanager
async def lifespan(app: FastAPI):
    db: Session = SessionLocal()
    initialize_areas(db)
    yield
    db.close()

app = FastAPI(lifespan=lifespan)

origins = [
    'http://localhost:8000',
    'http://0.0.0.0:8000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(schedule.router)
app.include_router(area.router)
app.include_router(auth.router)

def initialize_areas(db: Session):
    areas = [
        schemas.AreaCreate(id=1, name="Churrasqueira"),
        schemas.AreaCreate(id=2, name="Quadra"),
        schemas.AreaCreate(id=3, name="Campo"),
    ]
    for area in areas:
        if not db.query(models.Area).filter(models.Area.id == area.id).first():
            new_area = models.Area(**area.model_dump())
            db.add(new_area)
    db.commit()