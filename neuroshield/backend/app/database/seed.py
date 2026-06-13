from app.database.session import (
    SessionLocal
)

from app.database.models import (
    Threat
)


def seed_database():

    db = SessionLocal()

    try:

        threat = Threat(
            process_name="sample.exe",

            pid=1234,

            anomaly_score=0.81,

            risk_score=85,

            severity="HIGH",

            status="ACTIVE",

            description=
                "Sample threat"
        )

        db.add(threat)

        db.commit()

        print(
            "Sample threat inserted"
        )

    finally:

        db.close()


if __name__ == "__main__":

    seed_database()