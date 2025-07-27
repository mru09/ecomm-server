const Product = require('../models/Product');
const { ObjectId } = require('mongodb');

// GET /products - return all products
exports.getAllProducts = async (req, res) => {
  try {
    let products;

    if (req.role === 'seller') {
      // Only fetch products belonging to this seller

      products = await Product.find({ sellerId: new ObjectId(req.userId) });
    } else {
      // For users and public view, return all products
      products = await Product.find();
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
