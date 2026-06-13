from fastapi import APIRouter

from app.schemas.threat import (
    ThreatCreate
)

from app.database.models import (
    Threat
)

from app.services.threat_service import (
    ThreatService
)

router = APIRouter()


@router.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "NeuroShield"
    }

@router.post("/")
def create_threat(
    payload: ThreatCreate
):

    db = SessionLocal()

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