const mongoose = require("mongoose");

const consumerSchema = mongoose.Schema({
  consumerId: { type: Number },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  personalNumber: { type: Number, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  imagePath: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Consumer", consumerSchema);
