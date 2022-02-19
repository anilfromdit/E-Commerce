const express = require("express");
const { getAllOffers,createOffer } = require("../controllers/offersController");
// const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productControllers");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/offers").get(getAllOffers);
router.route("/admin/newOffer").post(isAuthenticatedUser, authorizedRoles("admin"), createOffer);

module.exports = router 
