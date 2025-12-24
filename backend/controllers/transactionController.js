const Transaction = require("../models/Transaction");
const { getRiskFromML } = require("../services/mlService");
const { logAction } = require("../services/auditService");

// GET all transactions with pagination
exports.getTransactions = async (req, res) => {
    try {
        const { page = 1, limit = 10, highRisk } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        let query = {};
        if (highRisk === "true") {
            query.riskScore = { $gte: 0.7 };
        }

        const transactions = await Transaction.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ timestamp: -1 });

        const total = await Transaction.countDocuments(query);

        res.json({
            transactions,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit))
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST create new transaction
exports.createTransaction = async (req, res) => {
    try {
        // 1. Call ML service
        const mlResult = await getRiskFromML(req.body);

        // 2. Persist transaction
        const tx = await Transaction.create({
            ...req.body,
            timestamp: new Date(),
            riskScore: mlResult.riskScore
        });

        // 3. Audit log AFTER successful write
        await logAction("CREATE_TRANSACTION", {
            transactionId: tx._id,
            riskScore: tx.riskScore
        });

        // 4. Respond
        res.status(201).json(tx);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
