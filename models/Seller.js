const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // hashed
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('seller', SellerSchema);
