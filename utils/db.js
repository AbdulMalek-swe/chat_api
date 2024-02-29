var mongoose = require('mongoose');
module.exports.dbConnect = () => {
    mongoose
        .connect("mongodb+srv://inventoryProductData:9UE5h0IPO9pQ4z2W@laztdeveloper.zprclij.mongodb.net/newalier?retryWrites=true&w=majority")
        .then(res => console.log("DATABASE CONNECTED"))
        .catch(err => console.log(err.messagev))
}