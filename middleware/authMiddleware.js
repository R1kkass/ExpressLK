const jwt = require('jsonwebtoken')

module.exports = function (){
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(402).json({message: "Вы не авторизованы", bool: false})
            }
            console.log(token);
            next()
        } catch(e){
            return res.status(401).json({message: "Вы не авторизованы", bool: false})
        }
    }
}