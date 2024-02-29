const express = require("express");
const controller = require("./user.controller");
const router = express.Router();
router
    .post("/register", controller.signup)
    .post("/login", controller.login)
    .get("/", controller.getAllUser)
module.exports = router;