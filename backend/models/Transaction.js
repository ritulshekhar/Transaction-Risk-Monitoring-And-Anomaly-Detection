const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    timestamp: Date,
    riskScore: Number
});

module.exports = mongoose.model("Transaction", TransactionSchema);
