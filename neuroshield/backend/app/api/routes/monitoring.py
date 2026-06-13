from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
def monitoring_status():
    return {
        "monitoring": True
    }