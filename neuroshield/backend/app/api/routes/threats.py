from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.session import (
    SessionLocal
)

from app.database.models import (
    Threat
)

from app.schemas.threat import (
    ThreatCreate
)

from app.services.threat_service import (
    ThreatService
)

router = APIRouter()


@router.get("/")
def get_threats():

    db: Session = SessionLocal()

    try:

        threats = (
            db.query(
                Threat
            ).all()
        )

        return threats

    finally:

        db.close()


@router.get("/{threat_id}")
def get_threat(
    threat_id: int
):

    db: Session = SessionLocal()

    try:

        threat = (
            db.query(
                Threat
            )
            .filter(
                Threat.id == threat_id
            )
            .first()
        )

        return threat

    finally:

        db.close()


@router.post("/")
def create_threat(
    payload: ThreatCreate
):

    db: Session = SessionLocal()

    try:

        threat = (
            ThreatService.create_threat(
                db,
                payload.model_dump()
            )
        )

        return threat

    finally:

        db.close()