const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const pizzaRouter = require("./pizzaRouter");
const basketRouter = require("./basketRouter");
const tasteRouter = require("./tasteRouter");
const orderRouter = require("./orderRouter");

router.use("/user", userRouter);
router.use("/pizza", pizzaRouter);
router.use("/basket", basketRouter);
router.use("/taste", tasteRouter);
router.use("/order", orderRouter);

module.exports = router;
