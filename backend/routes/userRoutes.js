const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require("../controllers/userController");

const router = express.Router();


router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);


module.exports = router;