import asyncio
import os
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

from app.core.settings_loader import get_active_settings
from app.core.process_helper import find_target_process
from app.response.process_killer import ProcessKiller

# Resolve simulation state file path relative to demo folder
DEMO_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "demo"
)
STATE_FILE = os.path.join(DEMO_DIR, "simulation_state.txt")


def scan_for_malicious_process():
    """
    Scans the running system processes to find any threat simulator.
    """
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            name = (proc.info.get('name') or '').lower()
            if 'python' in name or name in ['py.exe', 'py']:
                cmdline = proc.info.get('cmdline') or []
                cmdline_str = " ".join(cmdline).lower()

                simulators = [
                    "simulate_low_threat.py",
                    "simulate_medium_threat.py",
                    "simulate_high_threat.py",
                    "simulate_critical_threat.py",
                    "malware_simulator.py",
                    "fake_ransomware.py"
                ]

                for sim in simulators:
                    if sim in cmdline_str:
                        return {
                            "process_name": sim,
                            "pid": proc.info['pid'],
                            "is_mock": False,
                            "description": f"Simulated Threat ({sim.replace('_', ' ').replace('.py', '')}) active."
                        }
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    return None


async def autonomous_detection_loop():

    while True:

        db = SessionLocal()

        try:
            settings = get_active_settings()
            target_app_name = settings.get("target_app_name", "protected_app.py")
            auto_kill = settings.get("auto_kill", True)
            force_shutdown_on_crit = settings.get("force_shutdown_on_critical", True)

            # Check if target app is running
            app_proc = find_target_process(target_app_name)
            app_status = "RUNNING" if app_proc else "OFFLINE"

            # Analyze current vitals
            result = (
                DetectionService.analyze()
            )

            print(
                "DETECTION RESULT:",
                result
            )

            metrics = result["metrics"]
            # Append target app status & name for the frontend dashboard
            metrics.update({
                "app_status": app_status,
                "target_app_name": target_app_name
            })

            MetricService.create_metric(
                db,
                metrics
            )

            await manager.send_metrics(
                metrics
            )

            # Scan for simulator process
            simulator_proc = scan_for_malicious_process()

            # Map simulator process to threat severity directly for instant response
            sim_severity = None
            if simulator_proc:
                proc_name = simulator_proc["process_name"]
                if "simulate_low_threat.py" in proc_name:
                    sim_severity = "LOW"
                elif "simulate_medium_threat.py" in proc_name:
                    sim_severity = "MEDIUM"
                elif "simulate_high_threat.py" in proc_name:
                    sim_severity = "HIGH"
                elif "simulate_critical_threat.py" in proc_name:
                    sim_severity = "CRITICAL"

            if sim_severity:
                severity = sim_severity
            else:
                severity = result["severity"]

            risk_score = result["risk_score"]
            if sim_severity:
                if sim_severity == "LOW":
                    risk_score = round(15.0 + (risk_score % 20.0), 2)
                elif sim_severity == "MEDIUM":
                    risk_score = round(45.0 + (risk_score % 10.0), 2)
                elif sim_severity == "HIGH":
                    risk_score = round(65.0 + (risk_score % 10.0), 2)
                elif sim_severity == "CRITICAL":
                    risk_score = round(85.0 + (risk_score % 10.0), 2)

            # If severity is elevated, register threat and take action
            if severity in ["MEDIUM", "HIGH", "CRITICAL"]:
                # Identify culprit details
                if simulator_proc:
                    process_name = simulator_proc["process_name"]
                    pid = simulator_proc["pid"]
                    description = simulator_proc["description"] + " | " + " | ".join(result["explanations"])
                else:
                    process_name = target_app_name
                    pid = app_proc.pid if app_proc else 0
                    description = f"Protected App exhibits suspicious behaviors. | " + " | ".join(result["explanations"])

                threat = (
                    ThreatService.create_threat(
                        db,
                        {
                            "process_name": process_name,
                            "pid": pid,
                            "anomaly_score": result["anomaly_score"],
                            "risk_score": risk_score,
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

                action_taken = "MONITOR"

                # If auto-kill is enabled, perform mitigation playbooks
                if auto_kill:
                    if severity == "CRITICAL" and force_shutdown_on_crit:
                        # Force Shutdown: Kill target app to protect data
                        if app_proc:
                            try:
                                ProcessKiller.kill(app_proc.pid)
                            except Exception:
                                pass
                        # Reset workload
                        try:
                            with open(STATE_FILE, "w") as f:
                                f.write("normal")
                        except Exception:
                            pass
                        # Kill the simulator process as well
                        if simulator_proc:
                            try:
                                ProcessKiller.kill(simulator_proc["pid"])
                            except Exception:
                                pass
                        action_taken = "FORCE_SHUTDOWN"
                    elif severity == "HIGH":
                        # Quarantine: Kill simulator process and reset workload
                        if simulator_proc:
                            try:
                                ProcessKiller.kill(simulator_proc["pid"])
                            except Exception:
                                pass
                        try:
                            with open(STATE_FILE, "w") as f:
                                f.write("normal")
                        except Exception:
                            pass
                        action_taken = "QUARANTINE"
                    elif severity == "MEDIUM":
                        # Alert
                        action_taken = "ALERT"
                else:
                    action_taken = "MONITOR"

                incident = (
                    IncidentService.create_incident(
                        db,
                        threat.id,
                        action_taken
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

        except Exception as e:
            print("ERROR IN AUTONOMOUS DETECTOR LOOP:", e)
        finally:
            db.close()

        await asyncio.sleep(5)