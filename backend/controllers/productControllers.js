const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError")
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
exports.getAllProducts= handleAsync( async(req,res,next)=>{

    const allProducts = await Product.find();
    res.status(200).json({
        success:true,
        allProducts})
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