const { Schema, model } = require("mongoose");

const Rooms = Schema({
    users: {type: [{
        name: {type: String, required: true},
        email: {type: String, required: true, unque: true},
        secondName: {type: String, required: true},
        role: {type: String, required: true},
        _id: {type: String, required: true}
    }], require: true}
})

module.exports = model('Rooms', Rooms)