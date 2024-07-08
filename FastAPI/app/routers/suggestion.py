from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, models

router = APIRouter(prefix="/suggestions", tags=["Suggestions"])

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.SuggestionResponse)
async def create_suggestion(suggestion: schemas.SuggestionCreate, db: Session = Depends(get_db)):
    new_suggestion = models.Suggestion(**suggestion.model_dump())
    db.add(new_suggestion)
    db.commit()
    db.refresh(new_suggestion)
    return new_suggestion

@router.get("/{id}", response_model=schemas.SuggestionResponse)
async def get_suggestion(id: int, db: Session = Depends(get_db)):
    suggestion = db.query(models.Suggestion).filter(models.Suggestion.id == id).first()
    if not suggestion:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Suggestion not found")
    return suggestion

@router.get("/", response_model=List[schemas.SuggestionResponse])
async def get_suggestions(db: Session = Depends(get_db)):
    suggestions = db.query(models.Suggestion).all()
    return suggestions
