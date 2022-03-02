const Offers = require("../models/offersModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllOffers = handleAsync(async (req, res, next) => {
  const offers = await Offers.find();

  res.status(200).json({
    success: true,
    offers,
  });
});

exports.createOffer = handleAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const offer = await Offers.create(req.body);
  res.status(201).json({ success: true, offer });
});

exports.deleteOffer = handleAsync(async (req, res, next) => {
  let offer = await Offers.findById(req.params.id);
  if (!offer) {
    return next(new ErrorHandler("Offer Not Found", 404));
  }
  await offer.remove();
  res.status(200).json({
    success: true,
    message: "offer Deleted Successfully",
  });
});
