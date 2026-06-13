from pydantic import BaseModel
from datetime import datetime


class ThreatBase(BaseModel):
    process_name: str
    pid: int

    anomaly_score: float
    risk_score: float

    severity: str
    status: str

    description: str


class ThreatCreate(ThreatBase):
    pass


class ThreatResponse(ThreatBase):
    id: int

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True