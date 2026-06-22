from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

from app.core.config import settings

def get_engine():
    mysql_url = (
        f"mysql+pymysql://"
        f"{settings.DB_USER}:"
        f"{settings.DB_PASSWORD}@"
        f"{settings.DB_HOST}:"
        f"{settings.DB_PORT}/"
        f"{settings.DB_NAME}"
    )
    sqlite_url = "sqlite:///./neuroshield.db"

    try:
        # Try to establish connection to MySQL with a short timeout
        temp_engine = create_engine(
            mysql_url,
            connect_args={"connect_timeout": 2},
            echo=False
        )
        with temp_engine.connect() as conn:
            pass
        return temp_engine
    except Exception as e:
        print(f"[DATABASE] MySQL connection failed: {e}. Falling back to SQLite (neuroshield.db).")
        # SQLite requires check_same_thread=False for multi-threaded FastAPI usage
        return create_engine(
            sqlite_url,
            connect_args={"check_same_thread": False},
            echo=False
        )

engine = get_engine()

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)