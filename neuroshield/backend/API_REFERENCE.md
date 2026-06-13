# NeuroShield Backend API

## Root

GET /

Returns API status.

---

## Health

GET /api/health

Response

{
  "status": "healthy",
  "service": "NeuroShield"
}

---

## Threats

GET /api/threats

GET /api/threats/{id}

POST /api/threats

---

## Monitoring

GET /api/monitoring/status

GET /api/monitoring/metrics

---

## Incidents

GET /api/incidents

POST /api/incidents

---

## WebSocket

ws://localhost:8000/ws

Events

system_metrics

new_threat

incident_created