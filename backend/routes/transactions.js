const router = require("express").Router();
const controller = require("../controllers/transactionController");

router.post("/", controller.createTransaction);

module.exports = router;