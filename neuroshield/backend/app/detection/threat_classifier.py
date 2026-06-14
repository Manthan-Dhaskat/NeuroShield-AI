class ThreatClassifier:

    @staticmethod
    def classify(
        risk_score: float
    ):

        if risk_score >= 33:         #This threshold is only for demo purposes, the actual threshold
            return "CRITICAL"        #to check for critical threats the threshold should be above 80

        if risk_score >= 32:
            return "HIGH"            #For high threats the threshold should be above 60

        if risk_score >= 30:
            return "MEDIUM"          #For medium threats the threshold should be above 40

        return "LOW"