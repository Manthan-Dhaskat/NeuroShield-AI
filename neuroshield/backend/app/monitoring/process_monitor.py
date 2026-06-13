import psutil


class ProcessMonitor:

    @staticmethod
    def collect():

        return {
            "process_count":
                len(
                    list(
                        psutil.process_iter()
                    )
                )
        }