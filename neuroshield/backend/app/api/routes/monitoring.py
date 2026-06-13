from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.database.models import SystemMetric

router = APIRouter()


@router.get("/status")
def monitoring_status():
    return {
        "monitoring": True
    }


@router.get("/metrics")
def get_metrics():

    db: Session = SessionLocal()

    try:

        metrics = (
            db.query(SystemMetric)
            .order_by(
                SystemMetric.id.desc()
            )
            .limit(50)
            .all()
        )

        return metrics

    finally:

        db.close()