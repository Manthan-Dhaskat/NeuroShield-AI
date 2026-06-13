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

        return {
            "anomaly":
                prediction[0] == -1,

            "score":
                abs(float(score))
        }