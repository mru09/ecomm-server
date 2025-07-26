const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  bundles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bundles' }],
}, { timestamps: true });

module.exports = mongoose.model('carts', cartSchema);
