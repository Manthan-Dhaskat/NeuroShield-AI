class ThreatClassifier:

    @staticmethod
    def classify(
        risk_score: float,
        med: float = 40.0,
        high: float = 60.0,
        crit: float = 80.0
    ):

        if risk_score >= crit:
            return "CRITICAL"

        if risk_score >= high:
            return "HIGH"

        if risk_score >= med:
            return "MEDIUM"

        return "LOW"