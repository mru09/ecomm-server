const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'seller', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('bundles', bundleSchema);
