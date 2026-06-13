from fastapi import FastAPI

from app.api.routes import (
    threats,
    monitoring,
    incidents,
    health,
)

app = FastAPI(
    title="NeuroShield API",
    version="1.0.0"
)

app.include_router(
    threats.router,
    prefix="/api/threats",
    tags=["Threats"]
)

app.include_router(
    monitoring.router,
    prefix="/api/monitoring",
    tags=["Monitoring"]
)

app.include_router(
    incidents.router,
    prefix="/api/incidents",
    tags=["Incidents"]
)

app.include_router(
    health.router,
    prefix="/api/health",
    tags=["Health"]
)


@app.get("/")
def root():
    return {
        "message": "NeuroShield API Running"
    }