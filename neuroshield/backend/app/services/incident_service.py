from sqlalchemy.orm import Session

from app.database.models import (
    Incident
)


class IncidentService:

    @staticmethod
    def create_incident(
        db: Session,
        threat_id: int,
        action: str
    ):

        incident = Incident(
            threat_id=
                threat_id,

            action_taken=
                action,

            action_status=
                "SUCCESS",

            details=
                f"Action executed: {action}"
        )

        db.add(incident)

        db.commit()

        db.refresh(incident)

        return incident