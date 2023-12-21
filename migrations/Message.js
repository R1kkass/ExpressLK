const { Schema, model } = require("mongoose");

const Message = Schema({
    user: {
        name: {type: String, required: true},
        secondName: {type: String, require: true},
        email: {type: String, require: true},
        _id: {type: String, require: true}
    },
    message: {type: String, require: true},
    date: {type: Number, require: true},
    idRoom: {type: String, require: true}
})

module.exports = model('Message', Message)