import psutil
from app.core.settings_loader import get_active_settings
from app.core.process_helper import find_target_process


class NetworkMonitor:

    @staticmethod
    def collect():
        settings = get_active_settings()
        target_app = settings.get("target_app_name", "protected_app.py")
        proc = find_target_process(target_app)

        sent = 0
        recv = 0

        if proc:
            try:
                io = proc.io_counters()
                sent = io.write_bytes
                recv = io.read_bytes
            except (psutil.NoSuchProcess, psutil.AccessDenied, AttributeError):
                pass

        return {
            "network_sent": sent,
            "network_received": recv,
        }