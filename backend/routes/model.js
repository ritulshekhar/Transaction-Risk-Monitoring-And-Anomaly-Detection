const router = require("express").Router();
const { fetchModelInfo } = require("../controllers/modelController");

router.get("/info", fetchModelInfo);

module.exports = router;
