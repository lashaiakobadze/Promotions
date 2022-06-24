const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
  promoId: { type: Number },
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer" },
  promoType: { type: String, required: true },
  promoCount: { type: Number, required: true },
  currency: { type: String, required: true }
});

module.exports = mongoose.model("Promo", promoSchema);
