const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');
const verifyUser = require('../middleware/verifyUser');

router.get('/', verifyUser, getAllProducts);

module.exports = router;
