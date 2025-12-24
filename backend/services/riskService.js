exports.calculateRiskScore = (amount) => {
    if (amount > 100000) return 0.9;
    if (amount > 50000) return 0.6;
    return 0.1;
};