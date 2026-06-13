class ThreatClassifier:

    @staticmethod
    def classify(
        anomaly_score: float
    ):

        if anomaly_score >= 0.105:
            return "CRITICAL"

        if anomaly_score >= 0.093:
            return "HIGH"

        if anomaly_score >= 0.08:
            return "MEDIUM"

        return "LOW"