from fastapi import FastAPI
from app.routers import user, schedule, area

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, World!"}

app.include_router(user.router)
app.include_router(schedule.router)
app.include_router(area.router)