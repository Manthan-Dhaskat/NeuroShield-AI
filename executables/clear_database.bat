@echo off
title Database Table Cleaner
echo Clearing NeuroShield Database Tables...
echo =======================================
cd ../neuroshield/backend
..\P1\Scripts\python.exe -m app.database.clear_db
echo =======================================
echo Database clear action finished.
pause
