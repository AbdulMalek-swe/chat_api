const express = require("express");
const controller = require("./controller");
const router = express.Router();
router
    .post("/", controller.addMessage)
    .post("/getmessage", controller.getMessages)
module.exports = router;