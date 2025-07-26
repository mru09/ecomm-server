const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId })
      .populate('products')
      .populate({
        path: 'bundles',
        populate: {
          path: 'products', // deeply populate each product inside bundles
        },
      }); 

    res.json(cart || { products: [], bundles: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { type, itemId } = req.body; // type = 'product' or 'bundle'

  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) cart = new Cart({ userId: req.userId, products: [], bundles: [] });

    if (type === 'product' && !cart.products.includes(itemId)) {
      cart.products.push(itemId);
    } else if (type === 'bundle' && !cart.bundles.includes(itemId)) {
      cart.bundles.push(itemId);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
