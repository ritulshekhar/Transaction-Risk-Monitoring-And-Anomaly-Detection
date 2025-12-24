# Transaction Risk Analysis and Anomaly Detection

A production-style transaction risk monitoring system designed for financial institutions.  
The platform combines a clean backend architecture, ML-based risk scoring, full audit logging, reproducible ML pipelines using DVC, and analyst/admin dashboards.

---

## Problem Statement
Banks must monitor millions of transactions daily to detect anomalous or risky behavior while ensuring:
- Auditability
- Model transparency
- Reproducibility
- Scalability

This project simulates a real-world banking risk monitoring system.

---

## Architecture Overview

Frontend (React)
→ Backend APIs (Node.js + Express)
→ MongoDB (Transactions, Audit Logs)
→ ML Service (FastAPI)
→ DVC (Data + Model Versioning)

---

## Tech Stack

**Frontend**
- React
- Axios

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose

**ML**
- Python
- Scikit-learn
- FastAPI

**MLOps**
- DVC
- Git

---

## Core Features

- Transaction ingestion via REST APIs
- ML-based risk scoring via external ML service
- Full audit logging for compliance
- Drift detection for model monitoring
- Pagination and filtering for large datasets
- Analyst and Admin dashboards
- Model metadata exposure (versioning & lineage)

---

## Folder Structure

backend/
routes/
controllers/
services/
models/
config/

frontend/
pages/
components/
api/

ml/
train.py
predict.py
drift.py


---

## Model Transparency

Each transaction is linked to:
- Model version
- DVC hash
- Training timestamp

Exposed via:
GET /api/model/info

---

## Testing

- Controller test (API behavior)
- Service test (business logic)

---

## Deployment

- Frontend: Vercel
- Backend: Render / Railway
- ML Service: FastAPI (Dockerized)

---