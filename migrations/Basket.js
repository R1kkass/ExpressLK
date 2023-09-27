const { Schema, model } = require("mongoose");

const Basket = new Schema({
    basketId: { type: String, required: true },
    price: { type: String, required: true },
    product: { type: Schema.Types.Mixed, required: true },
    count: { type: Number, required: true },
    productId: {type: String, required: true},
    defaultPrice: {type: String, required: true}
});

module.exports = model("Basket", Basket);
