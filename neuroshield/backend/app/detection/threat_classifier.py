class ThreatClassifier:

    @staticmethod
    def classify(
        risk_score: float
    ):

        if risk_score >= 80:
            return "CRITICAL"

        if risk_score >= 60:
            return "HIGH"

        if risk_score >= 40:
            return "MEDIUM"

        return "LOW"