const express = require('express');
const router = express.Router();
const { createBundle, getBundles, updateBundle, deleteBundle, checkDiscount } = require('../controllers/bundleController');
const { verifySeller } = require('../middleware/auth');

router.post('/', verifySeller, createBundle);
router.get('/', getBundles);
router.patch('/:id', verifySeller, updateBundle);
router.delete('/:id', verifySeller, deleteBundle);

module.exports = router;
