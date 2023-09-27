const ApiError = require("../error/ApiError");
const Basket = require("../migrations/Basket");

class BasketController {
    async addBasket(req, res) {
        try {
            const { product, basketId, price, count } = req.body;
            const basketFind = await Basket.findOne({
                basketId,
                productId: product._id,
            });
            let basket;
            if (basketFind) {
                let count = basketFind.count + 1;
                basket = await Basket.updateOne(
                    { _id: basketFind._id },
                    {
                        count,
                        price: String(
                            Number(basketFind.product?.defaultPrice || basketFind.product?.price) * Number(count)
                        ),
                    }
                );
            } else {
                basket = await Basket.create({
                    product,
                    price,
                    basketId,
                    count,
                    productId: product._id,
                    defaultPrice: price
                });
            }
            return res.json(basket);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async deleteBasket(req, res) {
        try {
            const { id, basketId } = req.query;
            await Basket.deleteOne({ _id: id, basketId });
            const basket = await Basket.find({ basketId });
            return res.json(basket);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async updateCountBasket(req, res) {
        try {
            const { id, count, basketId } = req.body;
            const bask = await Basket.findOne({ _id: id, basketId });
            const basket = await Basket.updateOne(
                { _id: id },
                {
                    count: count || 1,
                    price: String(
                        Number(bask?.defaultPrice || bask?.price) * Number(count || 1)
                    ),
                }
            );
            const baskUp = await Basket.find({ basketId });
            return res.json(baskUp);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getBasket(req, res) {
        try {
            const { basketId } = req.query;
            const basket = await Basket.find({ basketId });
            return res.json(basket);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new BasketController();
