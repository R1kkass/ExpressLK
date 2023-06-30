const { Schema, model } = require("mongoose");

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    basketId: { type: String, required: true },
    role: { type: String, required: true },
});

module.exports = model("User", User);
