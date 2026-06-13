from app.core.logger import logger


class Notifier:

    @staticmethod
    def notify(
        message: str
    ):

        logger.warning(
            f"[ALERT] {message}"
        )