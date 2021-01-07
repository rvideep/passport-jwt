const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;