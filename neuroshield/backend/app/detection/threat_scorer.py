class ThreatScorer:

    @staticmethod
    def calculate(
        metrics: dict,
        anomaly_score: float
    ):

        score = 0

        score += anomaly_score * 60

        score += (
            metrics["cpu_usage"]
            / 100
        ) * 15

        score += (
            metrics["memory_usage"]
            / 100
        ) * 15

        score += (
            metrics["disk_usage"]
            / 100
        ) * 10

        return round(score, 2)