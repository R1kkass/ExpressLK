const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const User = require("../migrations/User");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const mongoose = require("mongoose");

const generateJwt = (id, email, jobTitle, time) => {
    return jwt.sign({ id, email, jobTitle }, process.env.SECRET_KEY, {
        expiresIn: time || "30m",
    });
};

class UserController {
    async registration(req, res, next) {
            const {
                name,
                password,
                login,
                secondName,
                lastName,
                numberPhone,
                date,
                photo,
                jobTitle,
            } = req.body;
            if (
                !password ||
                !login ||
                !name ||
                !secondName ||
                !lastName ||
                !numberPhone ||
                !date
            ) {
                return next(ApiError.badRequest("Некорректный данные"));
            }
            const candidate = await User.findOne({ login });
            if (candidate) {
                return next(
                    ApiError.badRequest(
                        "Пользователь с таким login уже существует"
                    )
                );
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                name,
                password: hashPassword,
                login,
                secondName,
                lastName,
                numberPhone,
                jobTitle,
                photo: "ds",
                date,
            });

            const token = generateJwt(user.id, user.login, jobTitle);
            return res.json({ token });
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login });
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
                user.jobTitle,
            );
            const refresh_token = generateJwt(
                user.id,
                user.email,
                user.jobTitle,
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
            const user = await User.findOne({ _id: decoded.id });
            const access_token = generateJwt(
                decoded.id,
                decoded.email,
                user.jobTitle,
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
            let user = await User.find();
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
