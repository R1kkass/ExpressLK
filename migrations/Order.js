const { Schema, model } = require("mongoose");

const Order = new Schema({
    userId: { type: String, required: true },
    product: { type: Array, required: true },
    price: { type: Number, required: true },
    basketId: { type: String, required: true },
    count: { type: String, required: true },
    name: { type: String, required: true },
    street: { type: String, required: true },
    phone: { type: String, required: true },
    house: { type: String, required: true },
    apartment: { type: String },
    status: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = model("Order", Order);
