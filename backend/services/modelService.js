const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

/**
 * Get model metadata from ML service
 */
exports.getModelInfo = async () => {
    try {
        const response = await axios.get(`${ML_SERVICE_URL}/model/info`, { timeout: 3000 });
        return {
            ...response.data,
            dvcHash: "a9f3c21", // Still static as DVC hash is usually part of deployment build info
            status: "online"
        };
    } catch (error) {
        return {
            name: "IsolationForest (Fallback)",
            version: "v2.1",
            trainedAt: "Unknown",
            dvcHash: "a9f3c21",
            status: "offline"
        };
    }
};
