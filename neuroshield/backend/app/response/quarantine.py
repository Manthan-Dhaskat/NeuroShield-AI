import shutil
import os


class Quarantine:

    QUARANTINE_DIR = "quarantine"


    @classmethod
    def quarantine_file(
        cls,
        file_path: str
    ):

        try:

            os.makedirs(
                cls.QUARANTINE_DIR,
                exist_ok=True
            )

            filename = os.path.basename(
                file_path
            )

            destination = (
                f"{cls.QUARANTINE_DIR}/{filename}"
            )

            shutil.move(
                file_path,
                destination
            )

            return True

        except Exception:
            return False