from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db
from sqlalchemy.orm import Session
from app import schemas, models

router = APIRouter(prefix="/areas", tags=['Areas'])

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.AreaResponse)
async def create_area(area: schemas.AreaCreate, db: Session = Depends(get_db)):
    area_id = db.query(models.Area).filter(models.Area.id == area.id).first()
    if area_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Area with ID {area.id} already exists")
    new_area = models.Area(**area.model_dump())
    db.add(new_area)
    db.commit()
    db.refresh(new_area)
    return new_area

@router.get("/{id}", response_model=schemas.AreaResponse)
async def get_area(id: str, db: Session = Depends(get_db)):
    area = db.query(models.Area).filter(models.Area.id == id).first()
    if not area:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Area with ID {id} not found")
    return area

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_area(id: str, db: Session = Depends(get_db)):
    area = db.query(models.Area).filter(models.Area.id == id).first()
    if not area:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Area with ID {id} not found")
    db.delete(area)
    db.commit()
    return None

@router.get("/", response_model=List[schemas.AreaResponse])
async def get_areas(db: Session = Depends(get_db)):
    areas = db.query(models.Area).all()
    return areas