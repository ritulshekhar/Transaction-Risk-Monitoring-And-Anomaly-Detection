const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Object }
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
