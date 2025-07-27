const Cart = require('../models/Cart');
const {getDiscountedPrice} =  require('./discount');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId })
      .populate({
        path: 'products.product',
      })
      .populate({
        path: 'bundles.bundle',
        populate: {
          path: 'products', // deeply populate each product inside bundles
        },
      }); 

    if (!cart) {
      return res.json({ products: [], bundles: [] });
    }

    const transformedProducts = cart.products.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      total: item.quantity * item.product.price,
    }));

    const transformedBundles = cart.bundles.map((item) => {
      let discountedPrice = getDiscountedPrice(item.bundle.products);
      return {
        _id: item.bundle._id,
        name: item.bundle.name,
        quantity: item.quantity,
        price: discountedPrice,
        total: discountedPrice * item.quantity,
      };
    });

    const total = [
      ...transformedProducts.map((p) => p.total),
      ...transformedBundles.map((b) => b.total),
    ].reduce((sum, x) => sum + x, 0);

    res.json({
      products: transformedProducts,
      bundles: transformedBundles,
      total,
    });
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
      const existingProduct = cart.products.find((p) => p.product.toString() === itemId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product: itemId, quantity: 1 });
      }    
    } else if (type === 'bundle' && !cart.bundles.includes(itemId)) {
      const existingBundle = cart.bundles.find(
        (b) => b.bundle.toString() === itemId
      );

      if (existingBundle) {
        existingBundle.quantity += 1;
      } else {
        cart.bundles.push({ bundle: itemId, quantity: 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { type, itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    if (type === 'product') {
      const existingProduct = cart.products.find(
        (p) => p.product.toString() === itemId
      );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          cart.products = cart.products.filter(
            (p) => p.product.toString() !== itemId
          );
        }
      }
    } else if (type === 'bundle') {
      const existingBundle = cart.bundles.find(
        (b) => b.bundle.toString() === itemId
      );
      if (existingBundle) {
        if (existingBundle.quantity > 1) {
          existingBundle.quantity -= 1;
        } else {
          cart.bundles = cart.bundles.filter(
            (b) => b.bundle.toString() !== itemId
          );
        }
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
