const Router = require("express");
const router = new Router();
const checkMiddleWare = require("../middleware/checkMiddleWare");
const statsController = require("../controller/statsController");

// router.post("/create", checkMiddleWare("ADMIN"), pizzaController.getAll);
router.get("/tasks", statsController.statsTask);

module.exports = router;
