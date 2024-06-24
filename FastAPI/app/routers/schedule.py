from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db
from sqlalchemy.orm import Session
from app import oauth2, schemas, models

router = APIRouter(prefix="/schedules", tags=['Schedules'])

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.ScheduleResponse)
def create_schedule(schedule: schemas.ScheduleCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    user = db.query(models.User).filter(models.User.id == schedule.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with ID {schedule.user_id} not found")
    area = db.query(models.Area).filter(models.Area.id == schedule.area_id).first()
    if not area:    
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Area with ID {schedule.area_id} not found")
    new_schedule = models.Schedule(**schedule.model_dump())
    db.add(new_schedule)
    db.commit()
    db.refresh(new_schedule)
    return new_schedule

@router.get("/{id}", response_model=schemas.ScheduleResponse)
def get_schedule(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    schedule = db.query(models.Schedule).filter(models.Schedule.id == id).first()
    if not schedule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Schedule with ID {id} not found")
    return schedule

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_schedule(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    schedule = db.query(models.Schedule).filter(models.Schedule.id == id).first()
    if not schedule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Schedule with ID {id} not found")
    db.delete(schedule)
    db.commit()
    return