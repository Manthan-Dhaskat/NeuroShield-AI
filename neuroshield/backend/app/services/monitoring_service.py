import psutil


class MonitoringService:

    @staticmethod
    def get_system_metrics():

        return {
            "cpu_usage":
                psutil.cpu_percent(),

            "memory_usage":
                psutil.virtual_memory().percent,

            "disk_usage":
                psutil.disk_usage("/").percent,
        }