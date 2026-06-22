from app.database.session import SessionLocal, engine
from sqlalchemy import text


def clear_database():
    db = SessionLocal()
    print("[DATABASE] Preparing to clear tables...")

    # Disable foreign key checks temporarily to avoid constraint errors
    try:
        db.execute(text("SET FOREIGN_KEY_CHECKS = 0;"))
    except Exception:
        try:
            db.execute(text("PRAGMA foreign_keys = OFF;"))
        except Exception:
            pass

    tables = ["incidents", "threats", "system_metrics", "threat_explanations"]

    try:
        for table in tables:
            try:
                # Delete rows
                db.execute(text(f"DELETE FROM {table};"))
                db.commit()
                print(f"[DATABASE] Cleared table: {table}")

                # Reset auto-increment counters
                if "sqlite" in str(engine.url):
                    db.execute(text(f"DELETE FROM sqlite_sequence WHERE name='{table}';"))
                else:
                    db.execute(text(f"ALTER TABLE {table} AUTO_INCREMENT = 1;"))
                db.commit()
                print(f"[DATABASE] Reset auto-increment for: {table}")
            except Exception as e:
                print(f"[DATABASE] Warning: could not clean {table} ({e})")

        print("[DATABASE] Database tables cleared and counters reset successfully.")
    finally:
        # Re-enable foreign key checks
        try:
            db.execute(text("SET FOREIGN_KEY_CHECKS = 1;"))
        except Exception:
            try:
                db.execute(text("PRAGMA foreign_keys = ON;"))
            except Exception:
                pass
        db.close()


if __name__ == "__main__":
    clear_database()
