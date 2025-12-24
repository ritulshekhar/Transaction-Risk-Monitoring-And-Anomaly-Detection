// routes/transactions.js
const { body } = require("express-validator");

router.post(
    "/",
    body("amount").isNumeric(),
    body("userId").notEmpty(),
    controller.createTransaction
);
