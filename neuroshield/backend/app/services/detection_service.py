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

from app.core.settings_loader import get_active_settings


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

        settings = get_active_settings()

        severity = (
            ThreatClassifier.classify(
                risk_score,
                med=settings.get("med_threshold", 40.0),
                high=settings.get("high_threshold", 60.0),
                crit=settings.get("crit_threshold", 80.0)
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