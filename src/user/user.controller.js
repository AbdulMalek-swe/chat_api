const { generateToken } = require("../../utils/token");
const { signupService,
    findUserByToken,
    findUserByEmail,
    userSubscribeService,
    findAllUser } = require("./user.service");

// const bcrypt = require('bcryptjs');
// register function 
module.exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);
        const { password: pwd, ...others } = user.toObject();
        const token = generateToken(user);
        await user.save({ validateBeforeSave: false });
        res.status(200).json({
            status: "succesfful",
            message: "Check Email To Active Account",
            result: { token, ...others }
        });
    }
    catch (error) {
        res.status(401).json({
            error: error.message
        })
    }
}
// login function 
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide your credentials",
            });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user found. Please create an account",
            });
        }
        const isPasswordValid = user.comparePassword(password, user.password);
        if (!isPasswordValid) {

            return res.status(401).json({
                status: "fail",
                error: "Password is not correct",
            });
        }

        const token = generateToken(user);
        const { password: pwd, ...others } = user.toObject();
        res.status(200).json({
            status: "success",
            message: "Successfully logged in",

            result: { token, ...others }
        });
    } catch (error) {

        res.status(401).json({
            status: "fail",
            error: error.message
        });
    }
};
// profile get 
module.exports.getMe = async (req, res) => {
    try {

        const user = await findUserByEmail(req.user?.email);
        const { password: pwd, ...other } = user.toObject();

        const modifiedWishlist = other.wishlist.map(item => {
            const { like, ...rest } = item;
            return rest;
        });

        // Create a new object with the modified wishlist
        const others = { ...other, wishlist: modifiedWishlist };

        res.status(200).json({
            status: "succesfful",
            message: "get user all data",
            data: others
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports.getAllUser = async (req, res) => {
    try {
        const user = await findAllUser();

        // Create a new object with the modified wishlist

        res.status(200).json({
            status: "succesfful",
            message: "get user all data",
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
