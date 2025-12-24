"""
Utility functions for ML operations
"""
import pandas as pd
from scipy.stats import ks_2samp


def detect_drift(reference_path: str, current_path: str, column: str = "amount") -> dict:
    """
    Detect data drift using Kolmogorov-Smirnov test
    
    Args:
        reference_path: Path to reference/training data CSV
        current_path: Path to current/production data CSV
        column: Column to check for drift
    
    Returns:
        dict with drift detection results
    """
    ref_df = pd.read_csv(reference_path)
    cur_df = pd.read_csv(current_path)
    
    ref_values = ref_df[column].dropna()
    cur_values = cur_df[column].dropna()
    
    statistic, pvalue = ks_2samp(ref_values, cur_values)
    
    # Drift detected if p-value < 0.05 (95% confidence)
    drift_detected = pvalue < 0.05
    
    return {
        "drift_detected": drift_detected,
        "statistic": round(statistic, 4),
        "pvalue": round(pvalue, 4),
        "reference_samples": len(ref_values),
        "current_samples": len(cur_values),
        "reference_mean": round(ref_values.mean(), 2),
        "current_mean": round(cur_values.mean(), 2)
    }


def calculate_statistics(data_path: str, column: str = "amount") -> dict:
    """
    Calculate basic statistics for a dataset column
    """
    df = pd.read_csv(data_path)
    values = df[column].dropna()
    
    return {
        "count": len(values),
        "mean": round(values.mean(), 2),
        "std": round(values.std(), 2),
        "min": round(values.min(), 2),
        "max": round(values.max(), 2),
        "median": round(values.median(), 2)
    }
