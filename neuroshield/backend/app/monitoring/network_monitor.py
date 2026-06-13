import psutil


class NetworkMonitor:

    @staticmethod
    def collect():

        network = psutil.net_io_counters()

        return {
            "network_sent":
                network.bytes_sent,

            "network_received":
                network.bytes_recv,
        }