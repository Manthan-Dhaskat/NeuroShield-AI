from fastapi import FastAPI, WebSocket
from app.api.websocket.manager import manager

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


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):
    await manager.connect(
        websocket
    )

    try:
        while True:
            await websocket.receive_text()

    except Exception:
        manager.disconnect(
            websocket
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