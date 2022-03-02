const mongoose = require("mongoose");

const offersSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  validUpto: {
    type: Date,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Offer", offersSchema);
