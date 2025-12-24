"""
FastAPI ML Prediction Service for Transaction Risk Analysis
Provides real-time risk scoring via REST API
"""
import os
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional


app = FastAPI(
    title="Transaction Risk ML Service",
    description="Anomaly detection for transaction risk scoring",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class TransactionRequest(BaseModel):
    amount: float = Field(..., gt=0, description="Transaction amount")
    userId: str = Field(..., min_length=1, description="User identifier")
    

class PredictionResponse(BaseModel):
    riskScore: float = Field(..., ge=0, le=1, description="Risk score between 0 and 1")
    isAnomaly: bool = Field(..., description="Whether transaction is anomalous")
    confidence: Optional[float] = Field(None, description="Model confidence")


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_version: Optional[str]


# Load model on startup
model_data = None


def load_model():
    """Load the trained model from disk"""
    global model_data
    model_path = os.path.join(os.path.dirname(__file__), "..", "models", "model.pkl")
    
    if os.path.exists(model_path):
        with open(model_path, "rb") as f:
            model_data = pickle.load(f)
        print(f"Model loaded from: {model_path}")
        return True
    else:
        print(f"Model file not found at: {model_path}")
        return False


def sigmoid(x):
    """Sigmoid function to convert score to probability"""
    return 1 / (1 + np.exp(x))


@app.on_event("startup")
async def startup_event():
    """Load model when server starts"""
    load_model()


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for container orchestration"""
    return {
        "status": "healthy",
        "model_loaded": model_data is not None,
        "model_version": model_data.get("trained_at") if model_data else None
    }


@app.post("/predict", response_model=PredictionResponse)
async def predict(transaction: TransactionRequest):
    """
    Predict risk score for a transaction
    
    - **amount**: Transaction amount (positive number)
    - **userId**: User identifier
    
    Returns risk score between 0 (safe) and 1 (high risk)
    """
    if model_data is None:
        # Fallback: use rule-based scoring if model not loaded
        amount = transaction.amount
        if amount > 100000:
            risk_score = 0.9
        elif amount > 50000:
            risk_score = 0.6
        elif amount > 10000:
            risk_score = 0.3
        else:
            risk_score = 0.1
            
        return {
            "riskScore": round(risk_score, 4),
            "isAnomaly": risk_score > 0.5,
            "confidence": 0.5  # Low confidence for fallback
        }
    
    try:
        model = model_data["model"]
        scaler = model_data["scaler"]
        
        # Scale the input
        X = scaler.transform([[transaction.amount]])
        
        # Get anomaly score (negative = anomalous, positive = normal)
        score = model.decision_function(X)[0]
        
        # Convert to risk probability using sigmoid
        # More negative score = more anomalous = higher risk
        risk_score = sigmoid(score)
        
        return {
            "riskScore": round(float(risk_score), 4),
            "isAnomaly": risk_score > 0.5,
            "confidence": round(abs(float(score)), 4)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/model/info")
async def model_info():
    """Get information about the loaded model"""
    if model_data is None:
        return {"error": "Model not loaded", "fallback": True}
    
    return {
        "name": "IsolationForest",
        "version": "v2.1",
        "trainedAt": model_data.get("trained_at"),
        "contamination": model_data.get("contamination"),
        "nSamples": model_data.get("n_samples")
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
