const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
    {
        membar: Array
    },
    {
        timestamps: true
    }
)
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat