const { Router } = require("express");
const basketController = require("../controller/basketController");
const router = new Router();

router.post("/addbasket", basketController.addBasket);
router.delete("/deletebasket", basketController.deleteBasket);
router.get("/getbasket", basketController.getBasket);
router.put("/updatebasket", basketController.updateCountBasket);

module.exports = router;
