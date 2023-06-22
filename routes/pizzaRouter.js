const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkMiddleWare = require("../middleware/checkMiddleWare");
const pizzaController = require("../controller/pizzaController");

// router.post("/create", checkMiddleWare("ADMIN"), pizzaController.getAll);
router.post("/create", pizzaController.createPizza);
router.post("/update", pizzaController.updateStatus);
router.get("/getall", pizzaController.getAll);

module.exports = router;
