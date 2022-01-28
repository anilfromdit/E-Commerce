const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apiFeatures");
//create product
exports.createProduct = handleAsync( async(req,res,next)=>{
 
    const product = await Product.create(req.body);

    res.status(201).json({success:true,product})
})

// Get Product Details
exports.getProductDetails = handleAsync( async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404)) 
        // next(new ErrorHandler("product not found",404));
    }

    res.status(200).json({
        success:true,
        product
    })
})

//get all products 
exports.getAllProducts= handleAsync( async(req,res)=>{

    const productCount = await Product.countDocuments();
    const resultPerPage = 10;
    const apiFeature = new ApiFeature(Product.find(),req.query).search().filter().pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount})
    })


//update product details
exports.updateProduct = handleAsync( async (req,res,next)=>{

    let product = await  Product.findById(req.params.id);
    if(!product){
        return next (new ErrorHandler("Product Not Found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,runValidators:true,useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
}
)
//delete a product

exports.deleteProduct = handleAsync( async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next (new ErrorHandler("Product Not Found",404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"product Deleted Successfully"
    }) 

})