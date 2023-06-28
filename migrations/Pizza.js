const { Schema, model } = require("mongoose");

const Pizza = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    ingredients: { type: String, required: true },
    image: { type: String, required: true },
    weight: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
});

module.exports = model("Pizza", Pizza);
