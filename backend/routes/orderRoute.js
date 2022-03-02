const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/newOrder").post(isAuthenticatedUser, newOrder);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/order/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleOrder);
router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
