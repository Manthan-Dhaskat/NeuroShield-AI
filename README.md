# 🛡️ NeuroShield AI

### AI-Powered Autonomous Threat Detection & Response Platform

> **Detect. Prioritize. Respond.**
>
> Real-Time AI-Driven Cyber Defense

---

# 📖 Overview

NeuroShield AI is an autonomous cybersecurity platform that continuously monitors system behavior, detects anomalous activities using Artificial Intelligence, prioritizes threats through risk scoring, and automatically executes mitigation actions in real time.

Unlike traditional antivirus solutions that rely on predefined malware signatures, NeuroShield uses behavioral analysis and machine learning to identify previously unseen threats, making it effective against zero-day attacks and evolving malware variants.

---

# 🎯 Problem Statement

Develop an intelligent threat-response framework that autonomously:

- Detects cyber threats in real time
- Prioritizes threats based on severity
- Executes mitigation actions automatically
- Provides explainable AI-driven threat analysis
- Displays all activities through a real-time dashboard

NeuroShield addresses this challenge through a complete AI-driven threat detection and response pipeline.

---

# 🚀 Key Features

## 🔍 Real-Time System Monitoring
Continuously monitors system stats including CPU Usage, Memory Usage, Disk Usage, Running Processes, Network Activity, and overall System Health.

## 🤖 AI Anomaly Detection
Uses an **Isolation Forest** machine learning model to learn normal system behavior, detect anomalies, identify unknown malware, and generate confidence scores.

## ⚠️ Intelligent Threat Scoring
Calculates risk severity scores dynamically from anomaly scores, CPU load, memory utilization, and network traffic, mapping them to LOW, MEDIUM, HIGH, and CRITICAL severities.

## 📊 Real-Time Glassmorphic Dashboard
Features dynamic WebSocket streams connected to Zustand state stores, updating gauges, timeline logs, and area trend charts instantly without page refreshes.

---

# 🏗️ System Architecture

```text
System Monitoring
        │
        ▼
Feature Extraction
        │
        ▼
Isolation Forest
        │
        ▼
Threat Scoring Engine
        │
        ▼
Response Engine
        │
        ▼
FastAPI Backend
        │
  ┌─────┴─────┐
  ▼           ▼
SQLite/MySQL  WebSockets
              │
              ▼
      Next.js Dashboard
```

---

# ⚡ Rapid Local Setup & Execution

We have simplified local testing on Windows with **automatic database setup** and **one-click execution scripts**.

## Prerequisites
- **Python 3.10+** (with paths configured)
- **Node.js 18+** (with npm configured)

---

## 🏃 One-Click Batch Scripts (`executables/`)

All launcher utilities are consolidated inside the `executables/` directory.

### 1. Launch Platform
Double-click `executables/start_neuroshield.bat`.
This will:
- Set up local dependencies for both frontend and backend.
- Automatically initialize the database (falls back to local SQLite `neuroshield.db` if MySQL is not configured).
- Boot the FastAPI backend server (`localhost:8000`).
- Start the Next.js development server (`localhost:3000`).
- Automatically open the dashboard in your default browser.

### 2. Simulate Malware Threats
Double-click `executables/simulate_threat.bat`.
This will run the simulator loop generating malicious high-load processes, triggering the Isolation Forest model and updating the live dashboard feed.

### 3. Clear Logs & Reset Database
Double-click `executables/clear_database.bat`.
This runs the clearance script to reset threats, incidents, and telemetry counters, updating the UI instantly.

---

# 🗄️ Database Auto-Migration & SQLite Fallback
No database configuration is required to test locally. 
- **SQLite Fallback:** If the MySQL database environment variables or connection fails, the backend automatically creates and connects to `neuroshield/backend/neuroshield.db`.
- **Auto-Initialization:** Database tables, triggers, and indices are verified and initialized automatically on backend startup.

---

# 💻 Premium Dashboard & UI Navigation

The Next.js client features five dedicated glassmorphic pages:

- **Dashboard:** Features linear progress hardware health gauges, overall risk gauges, and a **Live Threat Feed** restricted to the latest **3 items** to keep operating views clean.
- **Threats:** Display search input logs, filters (by Severity and Mitigation status), and **expandable diagnostics drawers** which slide open on click to display deep AI analysis summaries and process telemetries.
- **Analytics:** Shows calculated security insights (Security score, mitigation rate, critical ratio) alongside donut severity layouts, linear gradients, and interactive hover tooltips.
- **Incidents:** Converted into a vertical mitigation timeline detailing automated responses and checks executed by the response playbooks.
- **Settings:** An administration panel with sliders to adjust AI thresholds, auto-mitigation switches, FastAPI latency test checkers, and a functional **Reset Database** trigger.

---

# 🛠 Technology Stack

### Frontend
- Next.js 16 (Turbopack)
- TypeScript
- Tailwind CSS / shadcn/ui
- Recharts / Zustand
- Lucide Icons

### Backend
- FastAPI
- SQLAlchemy / SQLite
- PyMySQL (for optional MySQL)
- psutil / Scikit-Learn

---

# 🏆 Hackathon Priorities

1. **Working End-to-End System:** One-click batch startup scripts and local SQLite db fallbacks ensure ease of evaluation.
2. **Professional Dashboard:** Visual glassmorphic designs, responsive timelines, and instant charts.
3. **Behavioral AI Verification:** The uvicorn backend scanner and Isolation Forest model execute threat classification and logging in real-time.
4. **Code Quality:** Fully compiled using TypeScript and verified clean.
