const mongoose = require("mongoose");

module.exports = mongoose.model("AuditLog", {
    action: String,
    timestamp: Date,
    metadata: Object
});
const AuditLog = require("../models/AuditLog");

await AuditLog.create({
    action: "CREATE_TRANSACTION",
    timestamp: new Date(),
    metadata: tx
});
