const Chat = require("./model");

// 
module.exports.createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {
        const chat = await Chat.findOne({
            membar: {
                $all: [firstId, secondId]
            }
        })
        if (chat) return res.json({
            chat: chat
        })
        const newChat = new Chat({
            membar: [firstId, secondId]
        })
        const response = await newChat.save();
        res.status(200).json(response)
    } catch (error) {

    }
}
module.exports.findUserChats = async (req, res) => {
    const firstId = req.params.firstId;
    const secondId = req.params.secondId;
    try {
        const chats = await Chat.findOne({
            membar: {
                $all: [firstId, secondId]
            }
        })
        res.status(200).json(chats)
    } catch (error) {

    }
}
module.exports.findUserChat = async (req, res) => {
    const userId = req.params.userId;
    try {
        const chat = await Chat.findOne({
            membar: {
                $in: [userId]
            }
        })
        res.status(200).json(chat)
    } catch (error) {

    }
}