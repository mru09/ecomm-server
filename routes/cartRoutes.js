const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const verifyUser = require('../middleware/verifyUser');

router.get('/', verifyUser, getCart);
router.post('/add', verifyUser, addToCart);
router.post('/remove', verifyUser, removeFromCart);

module.exports = router;
