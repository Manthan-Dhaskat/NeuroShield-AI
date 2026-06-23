import os
import time
import sys
import threading

STATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "simulation_state.txt")

# Ensure state file exists and starts as normal
if not os.path.exists(STATE_FILE):
    try:
        with open(STATE_FILE, "w") as f:
            f.write("normal")
    except Exception:
        pass

print("Protected Application is running (PID: {})...".format(os.getpid()))
print("Monitoring state file: {}".format(STATE_FILE))

# Threaded worker to consume resources based on state
class WorkloadWorker:
    def __init__(self):
        self.state = "normal"
        self.data_store = []
        self.running = True

    def update_state(self):
        while self.running:
            try:
                if os.path.exists(STATE_FILE):
                    with open(STATE_FILE, "r") as f:
                        self.state = f.read().strip().lower()
                else:
                    self.state = "normal"
            except Exception:
                self.state = "normal"
            time.sleep(1)

    def run_workload(self):
        print("Starting workload worker loop...")
        while self.running:
            if self.state == "low":
                # Low resource utilization (minor anomaly)
                # Quick calculation loop and sleep
                for i in range(1000):
                    _ = i * i
                time.sleep(0.2)

            elif self.state == "medium":
                # Medium resource utilization
                for i in range(10000):
                    _ = i * i
                time.sleep(0.05)

            elif self.state == "high":
                # High utilization: compute + allocate small memory chunk
                for i in range(100000):
                    _ = i * i
                # Small memory grow
                if len(self.data_store) < 200:
                    self.data_store.append("X" * 100000) # ~100KB
                time.sleep(0.01)

            elif self.state == "critical":
                # Critical resource utilization (100% thread load + rapid memory allocation)
                for i in range(500000):
                    _ = i * i
                # Rapid memory grow
                self.data_store.append("C" * 1000000) # ~1MB
                time.sleep(0.001)

            else:
                # Normal state: quiet idle
                self.data_store.clear()
                time.sleep(0.5)

worker = WorkloadWorker()

# Start checker thread
checker_thread = threading.Thread(target=worker.update_state, daemon=True)
checker_thread.start()

# Run workload loop
try:
    worker.run_workload()
except KeyboardInterrupt:
    print("Shutting down workload...")
    worker.running = False
