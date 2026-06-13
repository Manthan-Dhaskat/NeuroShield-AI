class ThreatExplainer:

    @staticmethod
    def explain(
        metrics: dict
    ):

        reasons = []

        if metrics["cpu_usage"] > 80:
            reasons.append(
                "High CPU utilization"
            )

        if metrics["memory_usage"] > 85:
            reasons.append(
                "High memory utilization"
            )

        if metrics["process_count"] > 300:
            reasons.append(
                "Abnormal process count"
            )

        if metrics["network_sent"] > 100000000:
            reasons.append(
                "Unusual network traffic"
            )

        return reasons