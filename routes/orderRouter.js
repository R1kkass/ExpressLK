const { Router } = require("express");
const orderController = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/addorder", authMiddleware(), orderController.addOrder);
router.put("/updateorder", orderController.updateOrder);
router.get("/getall", orderController.getAll);

module.exports = router;
