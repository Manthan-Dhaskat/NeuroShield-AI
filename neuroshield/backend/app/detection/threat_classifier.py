class ThreatClassifier:

    @staticmethod
    def classify(
        anomaly_score: float
    ):

        if anomaly_score >= 0.90:
            return "CRITICAL"

        if anomaly_score >= 0.70:
            return "HIGH"

        if anomaly_score >= 0.40:
            return "MEDIUM"

        return "LOW"