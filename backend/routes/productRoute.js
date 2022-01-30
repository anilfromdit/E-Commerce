const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productControllers");
const { isAuthenticatedUser , authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/newProduct").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct)
                                .delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router 