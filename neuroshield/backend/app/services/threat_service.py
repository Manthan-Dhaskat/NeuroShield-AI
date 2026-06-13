from sqlalchemy.orm import Session

from app.database.models import (
    Threat
)


class ThreatService:

    @staticmethod
    def create_threat(
        db: Session,
        data: dict
    ):

        threat = Threat(
            process_name=
                data["process_name"],

            pid=
                data["pid"],

            anomaly_score=
                data["anomaly_score"],

            risk_score=
                data["risk_score"],

            severity=
                data["severity"],

            status=
                "ACTIVE",

            description=
                data["description"]
        )

        db.add(threat)

        db.commit()

        db.refresh(threat)

        return threat