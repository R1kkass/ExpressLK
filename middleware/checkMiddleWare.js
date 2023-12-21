const jwt = require('jsonwebtoken')

module.exports = function (role){
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(402).json({message: "Вы не авторизованы"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.jobTitle !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            next()
        } catch(e){
            console.log(e);
                return res.status(401).json({message: "Вы не авторизованы"})
        }
    }
}