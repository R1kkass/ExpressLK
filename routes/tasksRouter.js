const Router = require("express");
const router = new Router();
const taskController = require("../controller/tasksController");

router.post("/addtask", taskController.create);
router.delete("/deletetask", taskController.delete);
router.get("/gettask", taskController.getAll);
router.get("/gettaskuser", taskController.getUser);
router.patch("/setstatustask", taskController.setStatus);


module.exports = router;
