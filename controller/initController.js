const ApiError = require("../error/ApiError");
const User = require("../migrations/User");
const bcrypt = require("bcrypt");

class InitController {
    async init(req, res) {
        try {
            const hashPassword = await bcrypt.hash("12345", 5);
            const user = await User.create({
                email: "Rikka2",
                password: hashPassword,
                role: "ADMIN",
                basketId: Date.now(),
            });
            return res.json(user);
        } catch (e) {
            return res.json(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new InitController();
