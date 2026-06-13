from sqlalchemy.orm import Session

from app.database.models import (
    SystemMetric
)


class MetricService:

    @staticmethod
    def create_metric(
        db: Session,
        metrics: dict
    ):

        metric = SystemMetric(
            cpu_usage=
                metrics["cpu_usage"],

            memory_usage=
                metrics["memory_usage"],

            disk_usage=
                metrics["disk_usage"],

            network_sent=
                metrics["network_sent"],

            network_received=
                metrics["network_received"]
        )

        db.add(metric)

        db.commit()

        db.refresh(metric)

        return metric