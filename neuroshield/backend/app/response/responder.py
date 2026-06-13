from app.response.notifier import (
    Notifier
)

from app.response.process_killer import (
    ProcessKiller
)


class Responder:

    @staticmethod
    def execute(
        severity: str,
        pid: int | None = None
    ):

        if severity == "LOW":

            return {
                "action":
                    "MONITOR"
            }

        if severity == "MEDIUM":

            Notifier.notify(
                "Medium threat detected"
            )

            return {
                "action":
                    "ALERT"
            }

        if severity == "HIGH":

            return {
                "action":
                    "QUARANTINE"
            }

        if severity == "CRITICAL":

            if pid:

                ProcessKiller.kill(
                    pid
                )

            return {
                "action":
                    "KILL_PROCESS"
            }

        return {
            "action":
                "MONITOR"
        }