const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword } = require("../controllers/userController");
const { isAuthenticatedUser ,authorizedRoles} = require("../middleware/auth");
const router = express.Router();


router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser ,getUserDetails);
router.route("/password/updatePassword").put(isAuthenticatedUser, updatePassword);
router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);


module.exports = router;