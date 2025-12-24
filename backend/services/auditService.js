const AuditLog = require("../models/AuditLog");

exports.logAction = async (action, metadata) => {
    await AuditLog.create({
        action,
        metadata
    });
};