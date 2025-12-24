const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
    const tx = await Transaction.create(req.body);
    res.json(tx);
};