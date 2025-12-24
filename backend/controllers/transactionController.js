const Transaction = require("../models/Transaction");
const { getRiskFromML } = require("../services/mlService");
const { logAction } = require("../services/auditService");

exports.createTransaction = async (req, res) => {
    try {
        // 1. Call ML service
        const mlResult = await getRiskFromML(req.body);

        // 2. Persist transaction
        const tx = await Transaction.create({
            ...req.body,
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
