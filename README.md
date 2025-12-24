# Transaction Risk Monitoring and Anomaly Detection

A production-grade fintech transaction risk monitoring system with ML-based anomaly detection, audit logging, and model versioning.

![Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%2018-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js%2020-339933)
![ML](https://img.shields.io/badge/ML-FastAPI%20%2B%20scikit--learn-009688)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248)

---

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  ML Service │
│   (React)   │     │  (Express)  │     │  (FastAPI)  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   MongoDB   │
                    └─────────────┘
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- MongoDB (or use Docker)

### Option 1: Docker Compose (Recommended)

```bash
# Clone and start all services
git clone <repo-url>
cd Transaction-Risk-Analysis-and-Anomaly-Detection

# Train the ML model first
cd ml
pip install -r requirements.txt
python train.py
cd ..

# Start all services
docker-compose up --build
```

Access:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML Service**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Option 2: Manual Setup

#### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### 2. ML Service
```bash
cd ml
pip install -r requirements.txt
python train.py  # Train model first
uvicorn predict:app --reload --port 8000
```

#### 3. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## Project Structure

```
├── backend/               # Node.js Express API
│   ├── controllers/       # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── middleware/       # Express middleware
├── frontend/             # React Vite application
│   ├── src/
│   │   ├── api/         # API client functions
│   │   ├── components/  # Reusable components
│   │   └── pages/       # Page components
├── ml/                   # Python ML service
│   ├── train.py         # Model training script
│   ├── predict.py       # FastAPI prediction service
│   ├── drift.py         # Drift detection
│   └── utils.py         # Utility functions
├── data/                 # Training data (DVC tracked)
├── models/               # Trained models (DVC tracked)
├── docker-compose.yml    # Local development setup
└── render.yaml           # Render deployment blueprint
```

---

## API Endpoints

### Backend (Port 5000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/transactions` | List transactions (paginated) |
| POST | `/api/transactions` | Create transaction |
| GET | `/api/audits` | List audit logs |
| GET | `/api/model/info` | Model metadata |

### ML Service (Port 8000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/predict` | Get risk score |
| GET | `/model/info` | Model details |
| GET | `/docs` | OpenAPI documentation |

---

## Environment Variables

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/risk_monitor` |
| `ML_SERVICE_URL` | ML service URL | `http://localhost:8000` |
| `FRONTEND_URL` | CORS allowed origin | `*` |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

### ML Service
No environment variables required. Model path is relative.

---

## ML Model

The system uses **Isolation Forest** for unsupervised anomaly detection.

### Training
```bash
cd ml
python train.py
```

Parameters are stored in `params.yaml`:
```yaml
model:
  contamination: 0.05  # Expected proportion of anomalies
```

### DVC (Data Version Control)
```bash
# Initialize DVC
dvc init

# Track data and models
dvc add data/transactions.csv
dvc add models/model.pkl

# Run pipeline
dvc repro
```

---

## Deployment

### Backend & ML → Render

1. Push code to GitHub
2. Connect repo to Render
3. Create MongoDB Atlas cluster (free tier)
4. Set environment variables:
   - `MONGO_URI`: MongoDB Atlas connection string
   - `FRONTEND_URL`: Your Vercel frontend URL

Or use the Blueprint:
```bash
# Render will auto-detect render.yaml
```

### Frontend → Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL

---

## Security

- CORS configured for specific origins
- Input validation on all endpoints
- No secrets in code (use environment variables)
- Security headers in production (nginx/Vercel)
- Audit logging for compliance

---

## Testing

### Backend
```bash
cd backend
npm test
```

### ML Service
```bash
cd ml
pytest test_predict.py
```

---

## License

ISC
