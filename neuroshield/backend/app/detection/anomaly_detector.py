from sklearn.ensemble import (
    IsolationForest
)

import numpy as np


class AnomalyDetector:

    def __init__(self):

        self.model = IsolationForest(
            contamination=0.05,
            random_state=42
        )

        self.trained = False


    def train(
        self,
        training_data: np.ndarray
    ):

        self.model.fit(
            training_data
        )

        self.trained = True


    def predict(
        self,
        features: np.ndarray
    ):

        if not self.trained:

            return {
                "anomaly": False,
                "score": 0.0
            }

        prediction = self.model.predict(
            features
        )

        score = self.model.decision_function(
            features
        )[0]

        is_anomaly = prediction[0] == -1

        # In scikit-learn, decision_function returns negative values for anomalies and positive for normal data.
        # Map this to an anomaly score between 0.0 (normal) and 1.0 (anomalous).
        if is_anomaly:
            anomaly_score = max(0.5, min(1.0, 0.5 - float(score)))
        else:
            anomaly_score = max(0.0, min(0.49, 0.15 - (float(score) / 2.0)))

        return {
            "anomaly": is_anomaly,
            "score": anomaly_score
        }