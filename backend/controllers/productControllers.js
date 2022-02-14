const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
//create product
exports.createProduct = handleAsync(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({ success: true, product })
})

// Get Product Details
exports.getProductDetails = handleAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
        // next(new ErrorHandler("product not found",404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

//get all products 
exports.getAllProducts = handleAsync(async (req, res,next) => {


    // const resultPerPage = 5;
    // const productsCount = await Product.countDocuments();
    // const apiFeature = new ApiFeature(Product.find(), req.query).search().filter()

    // let products = await apiFeature.query;
    // const filteredProductsCount = products.length;
    // apiFeature.pagination(resultPerPage)
    // res.status(200).json({
    //     success: true,
    //     products,
    //     productsCount,
    //     resultPerPage,
    //     filteredProductsCount
    // });

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  
    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;
  
    apiFeature.pagination(resultPerPage);
  
    // products = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });


});


//update product details
exports.updateProduct = handleAsync(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true, useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
}
)
//delete a product

exports.deleteProduct = handleAsync(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "product Deleted Successfully"
    })

})

// Create new review or update existing one
exports.createProductReview = handleAsync(async (req, res, next) => {

    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };


    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );


    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    });


});

//get all reviews of a product
exports.getProductReviews = handleAsync(async (req, res, next) => {

    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })

})
exports.deleteReview = handleAsync(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const review = product.reviews.filter((rev) => rev.user.toString() !== req.query.id.toString());
    console.log(review)

    let avg = 0;

    review.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (review.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / review.length;
    }

    const numOfReviews = review.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews: review,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
        numOfReviews
    });
});