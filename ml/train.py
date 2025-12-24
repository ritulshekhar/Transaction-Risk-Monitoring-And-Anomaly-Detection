"""
ML Training Script for Transaction Anomaly Detection
Uses Isolation Forest for unsupervised anomaly detection
Integrated with DVC for data and model versioning
"""
import os
import pickle
import yaml
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timezone


def load_params():
    """Load parameters from params.yaml (DVC params file)"""
    params_path = os.path.join(os.path.dirname(__file__), "..", "params.yaml")
    with open(params_path) as f:
        return yaml.safe_load(f)


def train_model():
    """Train Isolation Forest model for anomaly detection"""
    print("Loading parameters...")
    params = load_params()
    contamination = params.get("model", {}).get("contamination", 0.05)
    
    print(f"Training with contamination: {contamination}")
    
    # Load training data
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "transactions.csv")
    print(f"Loading data from: {data_path}")
    
    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} transactions")
    
    # Feature engineering: use amount for now, can extend to more features
    X = df[["amount"]].values
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Train Isolation Forest
    print("Training Isolation Forest model...")
    model = IsolationForest(
        contamination=contamination,
        random_state=42,
        n_estimators=100,
        n_jobs=-1
    )
    model.fit(X_scaled)
    
    # Create models directory if it doesn't exist
    models_dir = os.path.join(os.path.dirname(__file__), "..", "models")
    os.makedirs(models_dir, exist_ok=True)
    
    # Save model with scaler
    model_data = {
        "model": model,
        "scaler": scaler,
        "trained_at": datetime.now(timezone.utc).isoformat(),
        "contamination": contamination,
        "n_samples": len(df)
    }
    
    model_path = os.path.join(models_dir, "model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(model_data, f)
    
    print(f"Model saved to: {model_path}")
    print(f"Training complete - {datetime.utcnow().isoformat()}")
    
    return model_data


if __name__ == "__main__":
    train_model()
