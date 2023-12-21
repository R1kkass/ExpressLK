const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const pizzaRouter = require("./pizzaRouter");
const basketRouter = require("./basketRouter");
const tasksRouter = require("./tasksRouter");
const statsRouter = require("./statsRouter");
const adminUserRouter = require("./adminUserRouter");
const initController = require("../controller/initController");


router.use("/user", userRouter);
router.use("/tasks", tasksRouter);
router.use("/adminuser", adminUserRouter);
router.use("/stats", statsRouter);
router.post('/init', initController.init)

module.exports = router;
