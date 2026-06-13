from app.monitoring.collector import (
    Collector
)

from app.detection.feature_extractor import (
    FeatureExtractor
)

from app.detection.anomaly_detector import (
    AnomalyDetector
)

from app.detection.threat_classifier import (
    ThreatClassifier
)

from app.detection.threat_scorer import (
    ThreatScorer
)


class DetectionService:

    detector = AnomalyDetector()


    @classmethod
    def analyze(cls):

        metrics = Collector.collect()

        features = (
            FeatureExtractor.extract(
                metrics
            )
        )

        result = cls.detector.predict(
            features
        )

        anomaly_score = result["score"]

        severity = (
            ThreatClassifier.classify(
                anomaly_score
            )
        )

        risk_score = (
            ThreatScorer.calculate(
                metrics,
                anomaly_score
            )
        )

        return {
            "metrics":
                metrics,

            "anomaly_score":
                anomaly_score,

            "severity":
                severity,

            "risk_score":
                risk_score
        }