from fastapi import FastAPI
from app.routers import user, schedule, area, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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