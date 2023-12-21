const ApiError = require("../error/ApiError");
const User = require("../migrations/User");
const bcrypt = require("bcrypt");

class InitController {
    async init(req, res) {
        try {
            const hashPassword = await bcrypt.hash("12345", 5);
            const user = await User.create({
                login: "director",
                password: hashPassword,
                jobTitle: "Директор",
                name: "Имя",
                secondName: "Фамилия",
                lastName: "Отчество",
                numberPhone: "8899988899",
                photo: "ds",
                date: "2023-12-23",
            });
            return res.json(user);
        } catch (e) {
            return res.json(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new InitController();
