const { Router } = require("express");
const orderController = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();
const checkMiddleWare = require("../middleware/checkMiddleWare");


router.post("/addorder", authMiddleware(), orderController.addOrder);
router.get("/getalladm", checkMiddleWare('ADMIN'), orderController.admGetAll);
router.put("/updateorder", checkMiddleWare('ADMIN'), orderController.updateOrder);
router.get("/getall", orderController.getAll);

module.exports = router;
