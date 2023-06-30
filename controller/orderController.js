const Order = require("../migrations/Order");
const Basket = require("../migrations/Basket");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

class OrderController {
    async addOrder(req, res) {
        try {
            const decoded = jwt.verify(
                req.headers.authorization.split(" ")[1],
                process.env.SECRET_KEY
            );
            const {
                product,
                price,
                name,
                city,
                street,
                house,
                apartment = "none",
                phone,
                count,
                date,
            } = req.body;
            if (product.length) {
                await Order.create({
                    basketId: decoded.basketId,
                    product,
                    street,
                    price,
                    name,
                    userId: decoded.id,
                    status: "Принят в работу",
                    city,
                    house,
                    apartment,
                    phone,
                    count,
                    date,
                });
                await Basket.deleteMany({ basketId: decoded.basketId });
                let result = await Basket.find({ basketId: decoded.basketId });
                return res.json({ result });
            }
            return ApiError.badRequest(e.message);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async updateOrder(req, res) {
        try {
            const { status, id } = req.body;
            const order = await Order.updateOne({ _id: id }, { status });
            return res.json(order);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            const order = await Order.find({ userId: decoded.id });
            return res.json(order);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async admGetAll(req, res) {
        try{
            const order = await Order.find()
            return res.json(order)
        }catch(e) {
            return ApiError.badRequest(e.message);

        }
    }
}

module.exports = new OrderController();
