import psutil


class ProcessKiller:

    @staticmethod
    def kill(pid: int):

        try:
            process = psutil.Process(pid)
            # Commented out for demo purposes so that the simulator keeps running and generating threat loops
            # process.kill()
            print(f"[DEMO RESPONSE] Simulated process killing of PID {pid} ({process.name()}) succeeded.")
            return True

        except Exception:
            return False