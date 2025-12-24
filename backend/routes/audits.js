const router = require("express").Router();
const AuditLog = require("../models/AuditLog");

// GET all audit logs with pagination
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const logs = await AuditLog.find()
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ timestamp: -1 });

        const total = await AuditLog.countDocuments();

        res.json({
            logs,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit))
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
