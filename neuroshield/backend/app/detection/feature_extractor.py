from typing import Dict
import numpy as np


class FeatureExtractor:

    @staticmethod
    def extract(
        metrics: Dict
    ) -> np.ndarray:

        return np.array([
            [
                metrics.get(
                    "cpu_usage",
                    0
                ),

                metrics.get(
                    "memory_usage",
                    0
                ),

                metrics.get(
                    "disk_usage",
                    0
                ),

                metrics.get(
                    "process_count",
                    0
                ),

                metrics.get(
                    "network_sent",
                    0
                ),

                metrics.get(
                    "network_received",
                    0
                )
            ]
        ])