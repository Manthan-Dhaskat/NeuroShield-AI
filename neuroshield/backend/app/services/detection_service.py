from sklearn import metrics

from app.monitoring.collector import (
    Collector
)

from app.detection.feature_extractor import (
    FeatureExtractor
)

from app.detection.model_manager import (
    ModelManager
)

from app.detection.threat_classifier import (
    ThreatClassifier
)

from app.detection.threat_scorer import (
    ThreatScorer
)

from app.detection.explainer import (
    ThreatExplainer
)


class DetectionService:

    @classmethod
    def analyze(cls):

        ModelManager.initialize()

        metrics = Collector.collect()

        features = (
            FeatureExtractor.extract(
                metrics
            )
        )

        result = (
            ModelManager.detector.predict(
                features
            )
        )

        anomaly_score = (
            result["score"]
        )

        risk_score = (
            ThreatScorer.calculate(
                metrics,
                anomaly_score
            )
        )

        severity = (
            ThreatClassifier.classify(
                risk_score
            )
        )

        explanations = (
            ThreatExplainer.explain(
                metrics
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
                risk_score,

            "explanations":
                explanations
        }