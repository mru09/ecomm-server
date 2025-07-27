const express = require('express');
const router = express.Router();
const { createBundle, getBundles, updateBundle, deleteBundle, checkDiscount } = require('../controllers/bundleController');
const verifyUser = require('../middleware/verifyUser');

router.post('/', verifyUser, createBundle);
router.get('/', verifyUser, getBundles);
router.patch('/:id', verifyUser, updateBundle);
router.delete('/:id', verifyUser, deleteBundle);

module.exports = router;
