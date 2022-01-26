const Product = require("../models/productModel")



//create product
exports.createProduct = async(req,res,next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({success:true,product})
}

//get all products 
exports.getAllProducts=async(req,res,next)=>{

    const allProducts = await Product.find();
    res.status(200).json({
        success:true,
        allProducts})
    }


//update product details
exports.updateProduct = async (req,res,next)=>{

    let product = await  Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,runValidators:true,useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })


}

//delete a product

exports.deleteProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"product Deleted Successfully"
    }) 

}