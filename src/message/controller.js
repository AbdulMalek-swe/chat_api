const Message = require("./model");


module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        console.log(req.body);
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        console.log(projectedMessages);
        res.json(projectedMessages);
    } catch (ex) {
        res.status(501).json({
            message: ex.error
        })

    }
};

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        const data = new Message({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        console.log(data);
        const response = await data.save();
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        res.status(501).json({
            message: ex.error
        })
    }
};