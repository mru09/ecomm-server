const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, default: 1 },
    }
  ],
  bundles: [
    {
      bundle: { type: mongoose.Schema.Types.ObjectId, ref: 'bundles' },
      quantity: { type: Number, default: 1 },
    },
  ]
}, { timestamps: true });

module.exports = mongoose.model('carts', cartSchema);
