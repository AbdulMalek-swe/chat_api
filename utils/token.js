const jwt = require("jsonwebtoken")
exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role
    }
    const token = jwt.sign(payload, "13ea55bcf1edcb30f772c8132b21742935de8c99d41f5755d4c73cfc23ad105fc2b759bc6cf3f392691c98a03f2d683fd662ddd98ca3c04cb2b76aaf3b67035d", {
        expiresIn: '4d'
    })
    return token;
}