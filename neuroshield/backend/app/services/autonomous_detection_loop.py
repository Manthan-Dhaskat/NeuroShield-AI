import asyncio
import random

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

            print(
                "DETECTION RESULT:",
                result
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
                "MEDIUM",
                "HIGH",
                "CRITICAL"
            ]:

                demo_processes = [
                    "ransomware_sim.exe",
                    "crypto_miner.exe",
                    "network_scanner.exe",
                    "suspicious_powershell.exe",
                    "malicious_script.py",
                ]

                threat = (
                    ThreatService.create_threat(
                        db,
                        {
                            "process_name":
                                random.choice(
                                    demo_processes
                                ),

                            "pid":
                                random.randint(
                                    1000,
                                    9999
                                ),

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
                                " | ".join(
                                    result["explanations"]
                                )
                        }
                    )
                )

                await manager.send_threat(
                    {
                        "id": threat.id,
                        "process_name": threat.process_name,
                        "severity": threat.severity,
                        "description": threat.description,
                        "created_at": str(threat.created_at),
                        "risk_score": threat.risk_score,
                        "status": threat.status,
                    }
                )

                response = (
                    Responder.execute(
                        severity
                    )
                )

                incident = (
                    IncidentService.create_incident(
                        db,
                        threat.id,
                        response["action"]
                    )
                )

                await manager.send_incident(
                    {
                        "id": incident.id,
                        "action_taken": incident.action_taken,
                        "action_status": incident.action_status,
                        "details": incident.details,
                        "created_at": str(incident.created_at),
                        "threat_id": incident.threat_id,
                    }
                )

        finally:

            db.close()

        await asyncio.sleep(15)