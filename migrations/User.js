const { Schema, model } = require("mongoose");

const User = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    numberPhone: { type: String, required: true },
    date: { type: String, required: true },
    photo: { type: String, required: true },
});

module.exports = model("User", User);
 