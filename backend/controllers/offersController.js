const Offers = require("../models/offersModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllOffers = handleAsync(async(req,res,next)=>{
    const offers = await Offers.find()
  
    res.status(200).json({
      success: true,
      offers,
    });
})

exports.createOffer = handleAsync(async(req,res,next)=>{
    req.body.user = req.user.id;
    const offer = await Offers.create(req.body);
    res.status(201).json({ success: true, offer })
})