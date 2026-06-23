from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Boolean,
)

from sqlalchemy.orm import (
    declarative_base,
    relationship,
)

from datetime import datetime

Base = declarative_base()


class Threat(Base):
    __tablename__ = "threats"

    id = Column(
        Integer,
        primary_key=True
    )

    process_name = Column(
        String(255)
    )

    pid = Column(
        Integer
    )

    anomaly_score = Column(
        Float
    )

    risk_score = Column(
        Float
    )

    severity = Column(
        String(50)
    )

    status = Column(
        String(50)
    )

    description = Column(
        String(500)
    )

    created_at = Column(
        DateTime,
        default=datetime.now
    )

    updated_at = Column(
        DateTime,
        default=datetime.now
    )

    incidents = relationship(
        "Incident",
        backref="threat"
    )

    explanations = relationship(
        "ThreatExplanation",
        backref="threat"
    )


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(
        Integer,
        primary_key=True
    )

    threat_id = Column(
        Integer,
        ForeignKey(
            "threats.id"
        )
    )

    action_taken = Column(
        String(255)
    )

    action_status = Column(
        String(255)
    )

    details = Column(
        String(500)
    )

    created_at = Column(
        DateTime,
        default=datetime.now
    )


class SystemMetric(Base):
    __tablename__ = "system_metrics"

    id = Column(
        Integer,
        primary_key=True
    )

    cpu_usage = Column(
        Float
    )

    memory_usage = Column(
        Float
    )

    disk_usage = Column(
        Float
    )

    network_sent = Column(
        Float
    )

    network_received = Column(
        Float
    )

    timestamp = Column(
        DateTime,
        default=datetime.now
    )


class ThreatExplanation(Base):
    __tablename__ = "threat_explanations"

    id = Column(
        Integer,
        primary_key=True
    )

    threat_id = Column(
        Integer,
        ForeignKey(
            "threats.id"
        )
    )

    explanation = Column(
        String(1000)
    )


class AppSettings(Base):
    __tablename__ = "app_settings"

    id = Column(
        Integer,
        primary_key=True
    )

    target_app_name = Column(
        String(255),
        default="protected_app.py"
    )

    med_threshold = Column(
        Float,
        default=30.0
    )

    high_threshold = Column(
        Float,
        default=32.0
    )

    crit_threshold = Column(
        Float,
        default=33.0
    )

    auto_kill = Column(
        Boolean,
        default=True
    )

    force_shutdown_on_critical = Column(
        Boolean,
        default=True
    )

    theme = Column(
        String(50),
        default="dark"
    )