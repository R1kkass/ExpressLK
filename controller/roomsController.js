const ApiError = require("../error/ApiError");
const Rooms = require("../Model/Rooms");

class RoomsControoler {
    async createRoom(req, res) {
        try {
            const { users } = req.body;
            if (users.length < 2) {
                return ApiError.badRequest("Не правильно введены данные");
            }
            const room = await Rooms.create({
                users,
            });
            return res.json(room);
        } catch (e) {
            return ApiError.internal(e);
        }
    }
}

module.exports = new RoomsControoler();
