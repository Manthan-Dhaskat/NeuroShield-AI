from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.database.models import Incident

router = APIRouter()


@router.get("/")
def get_incidents():
    db: Session = SessionLocal()

    incidents = db.query(
        Incident
    ).all()

    db.close()

    return incidents