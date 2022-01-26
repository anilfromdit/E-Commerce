const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/new/product").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct);


module.exports = router 