from app.database.session import SessionLocal
from app.database.models import Threat


def seed_database():
    db = SessionLocal()

    sample_threat = Threat(
        process_name="sample.exe",
        pid=1234,
        anomaly_score=0.82,
        risk_score=85,
        severity="HIGH",
        status="ACTIVE",
        description="Sample seeded threat"
    )

    db.add(sample_threat)

    db.commit()

    db.close()


if __name__ == "__main__":
    seed_database()