const { Router } = require("express");
const userAdminController = require("../controller/adminUserController");
const router = new Router();
const checkMiddleWare = require("../middleware/checkMiddleWare");

router.get("/get", userAdminController.getAll);
router.put("/update", checkMiddleWare('ADMIN'), userAdminController.updateRole);

module.exports = router;