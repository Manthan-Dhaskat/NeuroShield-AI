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

Continuously monitors:

- CPU Usage
- Memory Usage
- Disk Usage
- Running Processes
- Network Activity
- System Health Metrics

---

## 🤖 AI-Powered Threat Detection

Uses an **Isolation Forest** machine learning model to:

- Learn normal system behavior
- Detect behavioral anomalies
- Identify unknown malware
- Generate anomaly confidence scores

### Why Isolation Forest?

Traditional antivirus software depends on malware signatures.

NeuroShield instead learns what normal behavior looks like and flags suspicious deviations, enabling detection of:

- Zero-day threats
- Unknown malware
- Insider attacks
- Suspicious process behavior

---

## ⚠️ Intelligent Threat Scoring

Threat severity is determined using:

- AI anomaly score
- CPU utilization
- Memory utilization
- Process behavior
- Network behavior

### Severity Levels

| Risk Score | Severity |
|------------|-----------|
| 0 – 25 | LOW |
| 26 – 50 | MEDIUM |
| 51 – 75 | HIGH |
| 76 – 100 | CRITICAL |

---

## 🛑 Autonomous Response Engine

Automatically performs mitigation actions based on threat severity.

| Severity | Action |
|-----------|---------|
| LOW | Monitor |
| MEDIUM | Alert |
| HIGH | Quarantine |
| CRITICAL | Kill Process + Create Incident |

---

## 📊 Real-Time Dashboard

Provides live visibility into:

- System Health
- Threat Feed
- Threat History
- Incident Logs
- Analytics
- Response Actions

All updates are streamed using WebSockets.

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
 ┌──────┴──────┐
 ▼             ▼
MySQL      WebSocket
                 │
                 ▼
         Next.js Dashboard
```

---

# ⚙️ How NeuroShield Works

## Step 1 — System Monitoring

The monitoring layer continuously collects:

- CPU Usage
- Memory Usage
- Disk Usage
- Process Information
- Network Statistics

Example:

```json
{
  "cpu_usage": 45,
  "memory_usage": 61,
  "disk_usage": 30
}
```

---

## Step 2 — Feature Extraction

Raw monitoring metrics are converted into AI-ready features.

Example:

```json
{
  "cpu_usage": 92,
  "memory_usage": 87,
  "network_connections": 250
}
```

---

## Step 3 — Anomaly Detection

The Isolation Forest model evaluates incoming system behavior.

Example Output:

```json
{
  "anomaly_score": 0.91
}
```

Higher anomaly scores indicate more suspicious behavior.

---

## Step 4 — Threat Scoring

Risk score is calculated using:

```python
risk_score =
(anomaly_score * 60) +
(cpu_usage / 100 * 15) +
(memory_usage / 100 * 15)
```

Example:

```json
{
  "anomaly_score": 0.91,
  "risk_score": 87,
  "severity": "CRITICAL"
}
```

---

## Step 5 — Autonomous Response

Based on severity:

```text
LOW       → Monitor
MEDIUM    → Alert
HIGH      → Quarantine
CRITICAL  → Kill Process
```

Response actions are logged and incidents are created automatically.

---

## Step 6 — Dashboard Visualization

Detected threats are pushed to the frontend through WebSockets.

Users can see:

- Live threats
- System metrics
- Response actions
- Incident creation
- Threat analytics

without refreshing the page.

---

# 🛠 Technology Stack

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Zustand

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- PyMySQL
- psutil
- Scikit-Learn
- WebSockets

## Database

- MySQL 8

## Deployment

- Docker
- Docker Compose

---

# 📂 Project Structure

```text
neuroshield/

├── frontend/
│
├── backend/
│
├── demo/
│
├── docs/
│
├── docker/
│
├── docker-compose.yml
│
├── README.md
│
└── requirements.txt
```

---

# 🧠 Backend Modules

## Monitoring Module

Responsible for collecting telemetry data.

```text
monitoring/
├── process_monitor.py
├── network_monitor.py
├── system_monitor.py
└── collector.py
```

### Responsibilities

- Process monitoring
- Network monitoring
- Resource monitoring
- Metric aggregation

---

## Detection Module

```text
detection/
├── feature_extractor.py
├── anomaly_detector.py
├── threat_classifier.py
└── threat_scorer.py
```

### Responsibilities

- Feature engineering
- AI anomaly detection
- Threat classification
- Risk scoring

---

## Response Module

```text
response/
├── responder.py
├── process_killer.py
├── quarantine.py
└── notifier.py
```

### Responsibilities

- Automated mitigation
- Threat containment
- Alert generation
- Incident creation

---

# 🗄️ Database Schema

## threats

Stores detected threats.

```sql
id
process_name
pid
anomaly_score
risk_score
severity
status
description
created_at
updated_at
```

---

## incidents

Stores response actions.

```sql
id
threat_id
action_taken
action_status
details
created_at
```

---

## system_metrics

Stores monitored metrics.

```sql
id
cpu_usage
memory_usage
disk_usage
network_sent
network_received
timestamp
```

---

## threat_explanations

Stores AI reasoning and explanations.

```sql
id
threat_id
reason
weight
```

---

# 🔌 WebSocket Events

Real-time events emitted by the backend:

```text
system_metrics
new_threat
threat_updated
incident_created
response_executed
```

---

# 🖥 Dashboard Pages

## Dashboard

Displays:

- Total Threats
- Active Threats
- Critical Incidents
- System Health
- Live Threat Feed

---

## Threat Analysis

Displays:

- Threat History
- Severity Distribution
- Threat Explanations

---

## Analytics

Displays:

- Threat Trends
- CPU Usage
- Memory Usage
- Network Activity

---

## Incidents

Displays:

- Response Actions
- Incident Logs
- Mitigation History

---

# 🧪 Demo Scenario

NeuroShield includes malware simulation tools.

```text
demo/
├── fake_ransomware.py
├── malware_simulator.py
└── sample_logs/
```

### Simulated Behaviors

- High CPU Consumption
- Excessive File Creation
- Network Activity Spikes

### Expected Flow

```text
Start Monitoring
      ↓
Run Malware Simulator
      ↓
Detect Anomaly
      ↓
Generate Threat Score
      ↓
Execute Response
      ↓
Create Incident
      ↓
Display On Dashboard
```

---

# 📈 Future Enhancements

- Deep Learning-Based Detection
- Threat Intelligence Integration
- Cloud Monitoring
- SIEM Integration
- Distributed Endpoint Protection
- Self-Learning Feedback Loop
- Explainable AI Expansion
- Predictive Threat Analytics

---

# 🎥 Demo Walkthrough

1. Start Backend Services
2. Start Frontend Dashboard
3. Begin System Monitoring
4. Run Malware Simulator
5. Observe Anomaly Detection
6. View Threat Generation
7. Watch Automatic Response Execution
8. Verify Incident Creation
9. Analyze Results on Dashboard

---

# 🏆 Hackathon Priorities

1. Working End-to-End System
2. Professional Dashboard
3. Live Demonstration
4. Presentation Quality
5. Code Quality

---

# 📜 License

This project was developed for educational, research, and hackathon purposes.

---

# 🎯 Conclusion

NeuroShield AI provides a complete end-to-end cybersecurity defense platform capable of:

✅ Monitoring system activity in real time

✅ Detecting behavioral anomalies using AI

✅ Prioritizing threats through intelligent scoring

✅ Executing automated response actions

✅ Visualizing everything through a modern dashboard

By focusing on behavioral analysis rather than signatures, NeuroShield is capable of detecting previously unseen threats and demonstrating the future of autonomous cyber defense.

---

## 🛡️ NeuroShield AI

### Detect. Prioritize. Respond.

**Real-Time AI-Driven Cyber Defense**
