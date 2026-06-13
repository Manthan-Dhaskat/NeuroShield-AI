import psutil


class ProcessKiller:

    @staticmethod
    def kill(pid: int):

        try:
            process = psutil.Process(pid)

            process.kill()

            return True

        except Exception:
            return False