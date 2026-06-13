class ResponseService:

    @staticmethod
    def recommend_action(
        severity: str
    ):

        actions = {
            "LOW": "MONITOR",
            "MEDIUM": "ALERT",
            "HIGH": "QUARANTINE",
            "CRITICAL": "KILL_PROCESS",
        }

        return actions.get(
            severity,
            "MONITOR"
        )