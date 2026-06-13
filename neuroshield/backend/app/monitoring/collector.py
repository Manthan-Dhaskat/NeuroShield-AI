from app.monitoring.system_monitor import (
    SystemMonitor
)

from app.monitoring.process_monitor import (
    ProcessMonitor
)

from app.monitoring.network_monitor import (
    NetworkMonitor
)


class Collector:

    @staticmethod
    def collect():

        data = {}

        data.update(
            SystemMonitor.collect()
        )

        data.update(
            ProcessMonitor.collect()
        )

        data.update(
            NetworkMonitor.collect()
        )

        return data