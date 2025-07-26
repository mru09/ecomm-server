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

    // Transform products
    const transformedProducts = cart.products.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price * item.quantity,
    }));

    // Transform bundles
    const transformedBundles = cart.bundles.map((item) => {
      const discountedPrice = getDiscountedPrice(item.bundle.products) * item.quantity;

      return {
        name: item.bundle.name,
        quantity: item.quantity,
        price: discountedPrice,
      };
    });

    res.json({
      products: transformedProducts,
      bundles: transformedBundles,
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
