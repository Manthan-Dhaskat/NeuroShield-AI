from app.database.session import engine
from app.database.models import Base


def initialize_database():

    Base.metadata.create_all(
        bind=engine
    )

    print(
        "Database initialized"
    )


if __name__ == "__main__":

    initialize_database()