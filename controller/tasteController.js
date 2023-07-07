const ApiError = require("../error/ApiError");
const Taste = require("../migrations/Taste");
const uuid = require("uuid");
const path = require("path");

class TasteController {
    async create(req, res) {
        try {
            const { name, price } = req.body;
            const { file } = req.files;
            let fileNames = uuid.v4() + file.name.split(" ").join("");
            const loc = path.resolve(__dirname, "..", "static", fileNames);
            
            file.mv(loc);
            await Taste.create({
                name,
                price,
                image: `${process.env.DOMEN}/${fileNames}`,
            });
            const taste= await Taste.find()
            return res.json({ taste });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query;
            await Taste.deleteOne({ _id: id });
            const taste = await Taste.find();
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
