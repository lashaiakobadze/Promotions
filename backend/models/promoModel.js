import mongoose from "mongoose";

const promoSchema = mongoose.Schema({
  promoId: { type: Number },
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer" },
  promoType: { type: String, required: true },
  promoCount: { type: Number, required: true },
  currency: { type: String },
  basicPromo: { type: Boolean }
});

export default mongoose.model("Promo", promoSchema);
