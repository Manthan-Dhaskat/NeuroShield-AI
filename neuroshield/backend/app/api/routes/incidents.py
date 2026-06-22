from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.database.models import Incident
from app.schemas.incident import (
    IncidentCreate
)

router = APIRouter()


@router.get("/")
def get_incidents():
    db: Session = SessionLocal()
    try:
        incidents = db.query(
            Incident
        ).all()
        return incidents
    finally:
        db.close()

@router.post("/")
def create_incident(
    payload: IncidentCreate
):
    db = SessionLocal()
    try:
        incident = Incident(
            threat_id=
                payload.threat_id,

            action_taken=
                payload.action_taken,

            action_status=
                payload.action_status,

            details=
                payload.details
        )
        db.add(incident)
        db.commit()
        db.refresh(incident)
        return incident
    finally:
        db.close()