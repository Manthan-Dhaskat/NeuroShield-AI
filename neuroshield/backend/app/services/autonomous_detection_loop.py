import asyncio

from app.database.session import (
    SessionLocal
)

from app.services.metric_service import (
    MetricService
)

from app.services.threat_service import (
    ThreatService
)

from app.services.incident_service import (
    IncidentService
)

from app.services.detection_service import (
    DetectionService
)

from app.response.responder import (
    Responder
)

from app.api.websocket.manager import (
    manager
)


async def autonomous_detection_loop():

    while True:

        db = SessionLocal()

        try:

            result = (
                DetectionService.analyze()
            )

            metrics = result["metrics"]

            MetricService.create_metric(
                db,
                metrics
            )

            await manager.send_metrics(
                metrics
            )

            severity = result["severity"]

            if severity in [
                "HIGH",
                "CRITICAL"
            ]:

                threat = (
                    ThreatService.create_threat(
                        db,
                        {
                            "process_name":
                                "unknown_process",

                            "pid":
                                0,

                            "anomaly_score":
                                result[
                                    "anomaly_score"
                                ],

                            "risk_score":
                                result[
                                    "risk_score"
                                ],

                            "severity":
                                severity,

                            "description":
                                "Autonomous detection"
                        }
                    )
                )

                await manager.send_threat(
                    {
                        "id":
                            threat.id,

                        "severity":
                            severity
                    }
                )

                response = (
                    Responder.execute(
                        severity
                    )
                )

                incident = (
                    IncidentService
                    .create_incident(
                        db,
                        threat.id,
                        response["action"]
                    )
                )

                await manager.send_incident(
                    {
                        "id":
                            incident.id,

                        "action":
                            response["action"]
                    }
                )

        finally:

            db.close()

        await asyncio.sleep(5)