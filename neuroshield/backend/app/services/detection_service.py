class DetectionService:

    @staticmethod
    def detect_anomaly(
        metrics: dict
    ):

        cpu = metrics["cpu_usage"]

        if cpu > 80:
            return {
                "anomaly_score": 0.90,
                "severity": "HIGH"
            }

        return {
            "anomaly_score": 0.20,
            "severity": "LOW"
        }