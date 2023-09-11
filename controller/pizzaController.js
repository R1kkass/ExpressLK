const ApiError = require("../error/ApiError");
const Pizza = require("../migrations/Pizza");
const uuid = require("uuid");
const path = require("path");

class PizzaController {
    async createPizza(req, res) {
        try {
            const { name, price, weight, ingredients, category } = req.body;
            const { file } = req.files;
            let fileNames = uuid.v4() + file.name.split(" ").join("");
            const loc = path.resolve(__dirname, "..", "static", fileNames);
            
            file.mv(loc);
            await Pizza.create({
                name,
                price,
                weight,
                ingredients,
                image: `http://37.140.195.252:5001/${fileNames}`,
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
            const {
                name,
                price,
                weight,
                ingredients,
                image,
                category,
                status,
                _id,
            } = req.body;
            let fileNames;
            if (req?.files?.file) {
                const { file } = req.files;

                fileNames = uuid.v4() + file.name.split(" ").join("");
                const loc = path.resolve(__dirname, "..", "static", fileNames);

                file.mv(loc);
            }
            await Pizza.updateOne(
                { _id },
                {
                    name,
                    price,
                    weight,
                    ingredients,
                    image: fileNames
                        ? `http://localhost:5001/${fileNames}`
                        : image,
                    category,
                    status,
                }
            );
            const pizzas = await Pizza.find();

            return res.json(pizzas);
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
