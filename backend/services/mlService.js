const axios = require("axios");

exports.getRiskFromML = async (transaction) => {
    const response = await axios.post(
        "http://localhost:8000/predict",
        transaction
    );
    return response.data;
};