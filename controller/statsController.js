const ApiError = require("../error/ApiError");
const Taste = require("../migrations/Tasks");
const uuid = require("uuid");
const path = require("path");
const Tasks = require("../migrations/Tasks");

class StatsController {
    async statsTask(req, res) {
        try {
            const { title, contributor, status, time, description } = req.body;
            // const { file } = req.files;
            // let fileNames = uuid.v4() + file.name.split(" ").join("");
            // const loc = path.resolve(__dirname, "..", "static", fileNames);
            // `${process.env.DOMEN}/${fileNames}`
            // file.mv(loc);
            const notSuccess = await Tasks.count({
                status: "Не прочитано",
            });
            const inWork = await Tasks.count({
                status: "В работе",
            });
            const ready = await Tasks.count({
                status: "Готово",
            });
            const readyForTest = await Tasks.count({
                status: "Готово для проверки",
            });
            const success = await Tasks.count({
                status: "Выполнено",
            });

            return res.json([notSuccess, inWork, readyForTest, ready, success]);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new StatsController();
