const ApiError = require("../error/ApiError");
const Pizza = require("../migrations/Pizza");

class PizzaController {
    async createPizza(req, res) {
        try {
            const { name, price, weight, ingredients, image, category } =
                req.body;

            const pizza = await Pizza.create({
                name,
                price,
                weight,
                ingredients,
                image,
                status: "В наличии",
                category,
            });
            const pizzas = await Pizza.find();

            return res.json(pizzas);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async updateStatus(req, res) {
        try {
            const { name, price, weight, ingredients, image, category, status } =
                req.body;
            const pizza = await Pizza.updateOne(
                { _id: id },
                { name, price, weight, ingredients, image, category, status }
            );
            return res.json( pizza );
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res) {
        try {
            const pizzas = await Pizza.find();

            return res.json({ pizzas });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async deletePizza(req, res) {
        try {
            const { _id } = req.query;
            await Pizza.deleteOne({ _id });
            const pizzas = await Pizza.find();
            return res.json(pizzas);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new PizzaController();
