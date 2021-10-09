const router = require("express").Router();
const AuthController = require("./auth.controller");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/forgot-password", AuthController.forgotPassword);
router.post("/change-password", AuthController.changePassword);

module.exports = router;
