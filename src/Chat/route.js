const express = require("express");
const controller = require("./controller");
const router = express.Router();
router
    .post("/", controller.createChat)
    .get("/:userId", controller.findUserChat)
    .get("/find/:firstId/:secondId", controller.findUserChats)
module.exports = router;