const jwt = require("jsonwebtoken");
const Message = require("../migrations/Message");
const User = require("../migrations/User");


class MessageController {
    async create(data) {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        const { message, idRoom = 123, access_token } = data;

        const decode = jwt.decode(access_token);

        const userToken = await User.findOne({
            _id: decode.id,
        });

        const messageRes = await Message.create({
            user: {
                _id: userToken._id,
                name: userToken.name,
                secondName: userToken.secondName,
                login: userToken.login,
            },
            message, 
            date: Date.now(),
            idRoom
        });
        const messages = await Message.find({ idRoom });
        return messages;
    }

    async get() {

        const messages = await Message.find({ idRoom:123});

        return messages;
    }
}

module.exports = new MessageController();
