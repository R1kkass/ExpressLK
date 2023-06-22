const Router = require("express");
const router = new Router();
const tasteController = require("../controller/tasteController");

router.post("/addtaste", tasteController.create);
router.delete("/deletetaste", tasteController.delete);
router.get("/gettaste", tasteController.getAll);

module.exports = router;
