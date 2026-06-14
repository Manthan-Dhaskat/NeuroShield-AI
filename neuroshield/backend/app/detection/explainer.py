class ThreatExplainer:

    @staticmethod
    def explain(metrics):

        explanations = []

        if metrics["cpu_usage"] > 70:
            explanations.append(
                "High CPU utilization detected"
            )

        if metrics["memory_usage"] > 75:
            explanations.append(
                "Excessive memory consumption observed"
            )

        if metrics["disk_usage"] > 85:
            explanations.append(
                "Disk utilization approaching capacity"
            )

        if metrics["network_sent"] > 50000000:
            explanations.append(
                "Abnormally high outbound network traffic"
            )

        if metrics["network_received"] > 50000000:
            explanations.append(
                "Abnormally high inbound network traffic"
            )

        if metrics["process_count"] > 300:
            explanations.append(
                "Unusual number of active processes"
            )

        if not explanations:
            explanations.append(
                "System operating within normal parameters"
            )

        return explanations