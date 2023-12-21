require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
var fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const User = require("./migrations/User");

const { Server } = require("socket.io");
const { createServer } = require("http");
const Message = require("./migrations/Message");
const messageController = require("./controller/messageController");
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_DOMEN,
    },
});

app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_DOMEN || "http://37.140.195.252:8083",
    })
);
app.use(fileupload());

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(
            // `mongodb://root:example@${process.env.DOMEN_NAME}:64000/PizzaStore`
            `mongodb://root:example@mongo:27017/lk?authSource=admin`
        );
        httpServer.listen(3000, () => {
            console.log("rere");
        });

        app.listen(PORT, () =>
            console.log(
                `Server started on port ${PORT} ${process.env.CORS_DOMEN}`
            )
        );
    } catch (e) {
        console.log(e);
    }
};

start();

io.on("connection", async (socket, data) => {
    socket.join("123");
    // let res = await messageController.create(data);
    // io.to("123").emit("hi", res);
    let res = await messageController.get();
    io.to("123").emit("hi", res);

    socket.on("hi", async (data) => {
        let res = await messageController.create(data);
        io.to("123").emit("hi", res);
    });
});
