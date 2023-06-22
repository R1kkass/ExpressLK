const { Schema, model } = require("mongoose");

const Taste = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    image: {type: String, required: true}
});

module.exports = model("Taste", Taste);
