from pydantic import BaseModel
from typing import Optional


class AppSettingsBase(BaseModel):
    target_app_name: str
    med_threshold: float
    high_threshold: float
    crit_threshold: float
    auto_kill: bool
    force_shutdown_on_critical: bool
    theme: str


class AppSettingsUpdate(BaseModel):
    target_app_name: Optional[str] = None
    med_threshold: Optional[float] = None
    high_threshold: Optional[float] = None
    crit_threshold: Optional[float] = None
    auto_kill: Optional[bool] = None
    force_shutdown_on_critical: Optional[bool] = None
    theme: Optional[str] = None


class AppSettingsResponse(AppSettingsBase):
    id: int

    class Config:
        from_attributes = True
