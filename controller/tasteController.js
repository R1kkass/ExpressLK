const ApiError = require("../error/ApiError");
const Taste = require("../migrations/Taste");

class TasteController {
    async create(req, res) {
        try {
            const { name, price, image } = req.body;

            const taste = await Taste.create({
                name,
                price,
                image,
            });

            return res.json({ taste });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.body;
            const taste = await Taste.deleteOne({ _id: id });
            return res.json({ taste });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res) {
        try {
            const taste = await Taste.find();
            return res.json({ taste });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new TasteController();
