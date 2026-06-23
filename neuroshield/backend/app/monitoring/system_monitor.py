import psutil
from app.core.settings_loader import get_active_settings
from app.core.process_helper import find_target_process


class SystemMonitor:
    _cached_proc = None

    @staticmethod
    def collect():
        settings = get_active_settings()
        target_app = settings.get("target_app_name", "protected_app.py")

        proc = SystemMonitor._cached_proc
        is_valid = False
        if proc:
            try:
                if proc.is_running():
                    cmdline = proc.cmdline()
                    cmdline_str = " ".join(cmdline).lower()
                    if target_app.lower() in cmdline_str:
                        is_valid = True
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass

        if not is_valid:
            proc = find_target_process(target_app)
            SystemMonitor._cached_proc = proc

        cpu_val = 0.0
        mem_val = 0.0
        disk_val = psutil.disk_usage("/").percent

        if proc:
            try:
                # Get CPU usage of the process, normalized by CPU count
                cpu_val = proc.cpu_percent(interval=None)
                cpu_count = psutil.cpu_count()
                if cpu_count:
                    cpu_val = cpu_val / cpu_count
                mem_val = proc.memory_percent()
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass

        return {
            "cpu_usage": round(min(100.0, cpu_val), 2),
            "memory_usage": round(min(100.0, mem_val), 2),
            "disk_usage": round(disk_val, 2),
        }