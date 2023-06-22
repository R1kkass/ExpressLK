const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const User = require("../migrations/User");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const mongoose = require("mongoose");

const generateJwt = (id, email, role, basketId, time) => {
    return jwt.sign({ id, email, role, basketId }, process.env.SECRET_KEY, {
        expiresIn: time || "30m",
    });
};

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, basketId } = req.body;
            if (!email || !password || !basketId) {
                return next(
                    ApiError.badRequest("Некорректный email или password")
                );
            }
            const candidate = await User.findOne({ email });
            if (candidate) {
                return next(
                    ApiError.badRequest(
                        "Пользователь с таким email уже существует"
                    )
                );
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                email,
                password: hashPassword,
                role: "USER",
                basketId,
            });
            let a = await User.find({ email: "ddsda" });

            const token = generateJwt(user.id, user.email, "USER", basketId);
            return res.json({ token });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return next(ApiError.internal("Пользователь не найден"));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.internal("Указан неверный пароль"));
            }
            const access_token = generateJwt(
                user.id,
                user.email,
                user.role,
                user.basketId
            );
            const refresh_token = generateJwt(
                user.id,
                user.email,
                user.role,
                user.basketId,
                "30d"
            );
            res.cookie("refresh_token", refresh_token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({ access_token });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async refresh(req, res) {
        try {
            const decoded = jwt.verify(
                req.headers.cookie.replace("refresh_token=", ""),
                process.env.SECRET_KEY
            );

            const access_token = generateJwt(
                decoded.id,
                decoded.email,
                decoded.role,
                decoded.basketId
            );
            return res.json({ access_token });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async logout(req, res) {
        try {
            return res.clearCookie("refres_token");
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async check(req, res, next) {
        // const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.send("user");
    }

    async getOne(req, res) {
        try {
            const { email } = req.query;
            const user = await User.findOne({ where: { email } });
            return res.json({ user });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res) {
        try {
            let { email, role, limit, page, pole, sort } = req.query;
            email = email || "";
            limit = limit || 10;
            page = page || 1;
            let offset = page * limit - limit;
            role = role || "";
            let user = await User.findAndCountAll({
                where: { email: { [Op.like]: "%" + email + "%" } },
                limit,
                offset,
                order: [[pole, sort]],
            });
            return res.json({ user });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }

    async edit(req, res) {
        try {
            let { id, role } = req.body;
            let user = await User.update({ role: role }, { where: { id: id } });
            return res.json({ user });
        } catch (e) {
            return ApiError.badRequest(e.message);
        }
    }
}

module.exports = new UserController();
