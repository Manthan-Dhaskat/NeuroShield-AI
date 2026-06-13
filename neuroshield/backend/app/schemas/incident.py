from pydantic import BaseModel
from datetime import datetime


class IncidentBase(BaseModel):
    threat_id: int

    action_taken: str
    action_status: str

    details: str


class IncidentCreate(IncidentBase):
    pass


class IncidentResponse(IncidentBase):
    id: int

    created_at: datetime

    class Config:
        from_attributes = True