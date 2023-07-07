const ApiError = require("../error/ApiError");
const User = require("../migrations/User");

class AdminUserController {
    async getAll(req, res, next) {
        try {
            const user = await User.find();
            return res.json(user);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async updateRole(req, res) {
        try {
            const { id } = req.query;
            const { name } = req.body;
            await User.updateOne({ _id: id }, { role: name });
            const user = await User.find();
            return res.json(user);
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new AdminUserController();
