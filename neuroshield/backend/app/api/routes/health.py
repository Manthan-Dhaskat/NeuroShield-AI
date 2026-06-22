from fastapi import APIRouter
from app.database.clear_db import clear_database

router = APIRouter()


@router.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "NeuroShield"
    }


@router.post("/clear-db")
def clear_db():
    try:
        clear_database()
        return {"status": "success", "message": "Database cleared successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}