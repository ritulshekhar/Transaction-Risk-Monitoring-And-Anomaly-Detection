import pandas as pd
from scipy.stats import ks_2samp

def detect_drift(reference_path, current_path):
    ref = pd.read_csv(reference_path)["amount"]
    cur = pd.read_csv(current_path)["amount"]

    stat, pvalue = ks_2samp(ref, cur)

    return pvalue < 0.05