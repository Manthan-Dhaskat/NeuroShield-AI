import psutil


def find_target_process(target_app_name: str):
    if not target_app_name:
        return None
    target_app_name_lower = target_app_name.lower()
    for proc in psutil.process_iter(["pid", "name", "cmdline"]):
        try:
            name = (proc.info.get("name") or "").lower()
            cmdline = proc.info.get("cmdline") or []
            cmdline_str = " ".join(cmdline).lower()

            # Avoid matching monitoring loop or simulator scripts
            if (
                "simulate_" in cmdline_str
                or "main.py" in cmdline_str
                or "detection_loop" in cmdline_str
            ):
                continue

            # Check if target name matches process name or cmdline arguments
            if target_app_name_lower in name or any(
                target_app_name_lower in cmd.lower() for cmd in cmdline
            ):
                return proc
        except (
            psutil.NoSuchProcess,
            psutil.AccessDenied,
            psutil.ZombieProcess,
        ):
            continue
    return None
