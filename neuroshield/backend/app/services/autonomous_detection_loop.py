import asyncio
import random
import psutil

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


def scan_for_malicious_process():
    """
    Scans the running system processes to find either the malware simulator or fake ransomware scripts.
    """
    # Look for simulation scripts
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            name = (proc.info.get('name') or '').lower()
            # Only target python interpreters running the scripts to avoid false positives
            if 'python' in name or name in ['py.exe', 'py']:
                cmdline = proc.info.get('cmdline') or []
                cmdline_str = " ".join(cmdline).lower()
                if "malware_simulator.py" in cmdline_str:
                    return {
                        "process_name": "malware_simulator.py",
                        "pid": proc.info['pid'],
                        "is_mock": False,
                        "description": "Malware Simulator (High CPU/Memory Leak) detected active."
                    }
                if "fake_ransomware.py" in cmdline_str:
                    return {
                        "process_name": "fake_ransomware.py",
                        "pid": proc.info['pid'],
                        "is_mock": False,
                        "description": "Fake Ransomware (High Disk Write Spurt) detected active."
                    }
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    return None


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

            # Scan for actual target culprit or simulator process
            target_proc = scan_for_malicious_process()

            if target_proc:
                # Randomize severity across Medium, High, and Critical to show different responder actions
                severity = random.choice(["MEDIUM", "HIGH", "CRITICAL"])
            else:
                severity = result["severity"]

            if severity in [
                "MEDIUM",
                "HIGH",
                "CRITICAL"
            ] and target_proc:
                process_name = target_proc["process_name"]
                pid = target_proc["pid"]
                description = target_proc["description"] + " | " + " | ".join(result["explanations"])
                is_mock = target_proc["is_mock"]

                threat = (
                    ThreatService.create_threat(
                        db,
                        {
                            "process_name": process_name,
                            "pid": pid,
                            "anomaly_score": result["anomaly_score"],
                            "risk_score": result["risk_score"],
                            "severity": severity,
                            "description": description
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

                # Execute action. Pass real PID if it's not a mock threat
                response = (
                    Responder.execute(
                        severity,
                        pid=pid if not is_mock else None
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

        await asyncio.sleep(5)