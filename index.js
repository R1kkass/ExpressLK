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

app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_DOMEN || "http://localhost:5173",
    })
);
app.use(fileupload());

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:64000/PizzaStore");
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
