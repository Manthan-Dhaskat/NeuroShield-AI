import numpy as np

from app.detection.anomaly_detector import (
    AnomalyDetector
)


class ModelManager:

    detector = AnomalyDetector()

    trained = False


    @classmethod
    def initialize(cls):

        if cls.trained:
            return

        normal_data = np.array([
            [20, 30, 25, 100, 1000, 2000],
            [25, 35, 30, 105, 1200, 2100],
            [22, 32, 28, 102, 1100, 2050],
            [18, 28, 20, 95, 900, 1800],
            [24, 33, 29, 104, 1150, 2080],
            [21, 31, 27, 101, 1080, 2020],
            [23, 34, 31, 103, 1120, 2070],
        ])

        cls.detector.train(
            normal_data
        )

        cls.trained = True