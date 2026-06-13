import psutil


class SystemMonitor:

    @staticmethod
    def collect():

        return {
            "cpu_usage":
                psutil.cpu_percent(),

            "memory_usage":
                psutil.virtual_memory().percent,

            "disk_usage":
                psutil.disk_usage("/").percent,
        }