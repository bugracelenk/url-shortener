const router = require("express").Router();
const LogsController = require("./logs.controller");

router.get("/", LogsController.getLogs);

module.exports = router;
