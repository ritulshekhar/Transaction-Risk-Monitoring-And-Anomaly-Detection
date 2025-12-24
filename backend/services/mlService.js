const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

/**
 * Get risk score from ML service
 * Falls back to local calculation if ML service is unavailable
 */
exports.getRiskFromML = async (transaction) => {
    try {
        const response = await axios.post(
            `${ML_SERVICE_URL}/predict`,
            transaction,
            { timeout: 5000 }
        );
        return response.data;
    } catch (error) {
        console.warn("ML service unavailable, using fallback risk calculation");
        // Fallback: simple rule-based risk scoring
        const amount = transaction.amount || 0;
        let riskScore = 0.1;
        if (amount > 100000) riskScore = 0.9;
        else if (amount > 50000) riskScore = 0.6;
        else if (amount > 10000) riskScore = 0.3;

        return { riskScore, isAnomaly: riskScore > 0.5, fallback: true };
    }
};