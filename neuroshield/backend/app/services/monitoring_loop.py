import asyncio

from app.monitoring.collector import (
    Collector
)

from app.api.websocket.manager import (
    manager
)


async def monitoring_loop():

    while True:

        metrics = (
            Collector.collect()
        )

        await manager.send_metrics(
            metrics
        )

        await asyncio.sleep(5)