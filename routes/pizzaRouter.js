const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkMiddleWare = require("../middleware/checkMiddleWare");
const pizzaController = require("../controller/pizzaController");

// router.post("/create", checkMiddleWare("ADMIN"), pizzaController.getAll);
router.post("/create", checkMiddleWare('ADMIN'), pizzaController.createPizza);
router.post("/update",checkMiddleWare('ADMIN'),  pizzaController.updateStatus);
router.get("/getall", pizzaController.getAll);
router.delete("/delete", checkMiddleWare('ADMIN'), pizzaController.deletePizza);

module.exports = router;
