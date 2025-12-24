const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/transactionController");

// GET all transactions with pagination
router.get("/", controller.getTransactions);

// POST create new transaction with validation
router.post(
    "/",
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("userId").notEmpty().withMessage("User ID is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.createTransaction
);

module.exports = router;
