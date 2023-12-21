const ApiError = require("../error/ApiError");
const Tasks = require("../migrations/Tasks");

class TasksController {
    async create(req, res) {
        try {
            const { title, contributor, status, time, description, correlation } = req.body;
            // const { file } = req.files;
            // let fileNames = uuid.v4() + file.name.split(" ").join("");
            // const loc = path.resolve(__dirname, "..", "static", fileNames);
            // `${process.env.DOMEN}/${fileNames}`
            // file.mv(loc);
            await Tasks.create({
                title,
                contributor,
                status,
                time,
                description,
                correlation
            });
            const tasks = await Taste.find();
            return res.json({ tasks });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query;
            await Tasks.deleteOne({ _id: id });
            const taste = await Taste.find();
            return res.json({ taste });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res) {
        try {
            const tasks = await Tasks.find();
            return res.json({ tasks });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getUser(req, res) {
        try {
            const {id} = req.query
            const tasks = await Taste.find({contributor: id});
            return res.json({ tasks });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async setStatus(req, res) {
        try {
            const { id, status } = req.body;
            const tasks = await Taste.findOneAndUpdate({ _id: id }, { status });
            return res.json({ tasks });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new TasksController();
