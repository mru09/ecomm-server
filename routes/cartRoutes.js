const express = require('express');
const router = express.Router();
const { getCart, addToCart } = require('../controllers/cartController');
const verifyUser = require('../middleware/verifyUser');

router.get('/', verifyUser, getCart);
router.post('/add', verifyUser, addToCart);

module.exports = router;
