import os
import sys
import subprocess
import time
import psutil

DEMO_DIR = os.path.dirname(os.path.abspath(__file__))
STATE_FILE = os.path.join(DEMO_DIR, "simulation_state.txt")
APP_FILE = os.path.join(DEMO_DIR, "protected_app.py")


def is_app_running():
    for proc in psutil.process_iter(["name", "cmdline"]):
        try:
            cmdline = proc.info.get("cmdline") or []
            cmdline_str = " ".join(cmdline).lower()
            if "protected_app.py" in cmdline_str:
                return True
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return False


# Auto-start target app if offline
if not is_app_running():
    print("Protected app is offline. Starting target app: protected_app.py...")
    subprocess.Popen(
        [sys.executable, APP_FILE],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(1.5)

print("Writing MEDIUM state to trigger suspicious resource consumption...")
try:
    with open(STATE_FILE, "w") as f:
        f.write("medium")
except Exception as e:
    print("Error writing state:", e)
    sys.exit(1)

print("MEDIUM severity threat simulation active. Press Ctrl+C to terminate and reset.")
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nTerminating simulator. Resetting state to normal...")
    try:
        with open(STATE_FILE, "w") as f:
            f.write("normal")
    except Exception:
        pass
