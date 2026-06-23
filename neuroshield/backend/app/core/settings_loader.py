from app.database.session import SessionLocal
from app.database.models import AppSettings


def get_active_settings():
    db = SessionLocal()
    try:
        settings = db.query(AppSettings).first()
        if not settings:
            settings = AppSettings()
            db.add(settings)
            db.commit()
            db.refresh(settings)
        return {
            "target_app_name": settings.target_app_name,
            "med_threshold": settings.med_threshold,
            "high_threshold": settings.high_threshold,
            "crit_threshold": settings.crit_threshold,
            "auto_kill": settings.auto_kill,
            "force_shutdown_on_critical": settings.force_shutdown_on_critical,
            "theme": settings.theme,
        }
    finally:
        db.close()
