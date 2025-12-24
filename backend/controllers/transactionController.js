const Transaction = require("../models/Transaction");
const { calculateRiskScore } = require("../services/riskService");

exports.createTransaction = async (req, res) => {
    const riskScore = calculateRiskScore(req.body.amount);

    const tx = await Transaction.create({
        ...req.body,
        riskScore
    });

    res.json(tx);
};
