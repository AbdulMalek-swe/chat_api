const express = require("express")
const cors = require("cors");
require('dotenv').config();
const { dbConnect } = require("./utils/db");
const router = require("./src/user/user.route");
const chatRouter = require("./src/Chat/route");
const messageRouter = require("./src/message/route");
const app = express();
const port = 5000;
app.use(express.json())
app.use(cors());
dbConnect()
app.use("/user", router)
app.use("/chats", chatRouter)
app.use("/message", messageRouter)
app.listen(port, () => {
    console.log("server running on port", port)
})