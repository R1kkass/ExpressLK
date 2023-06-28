const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        } else {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
            return res.status(200).json({message: 'ura'})
        }
    } catch (e) {
        return ApiError.badRequest(e.message)
    }
};
