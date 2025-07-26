const express = require('express');
const router = express.Router();
const { createBundle, getBundles, updateBundle, deleteBundle, checkDiscount } = require('../controllers/bundleController');
const { verifySeller } = require('../middleware/auth');

router.post('/bundles', verifySeller, createBundle);
router.get('/bundles', getBundles);
router.patch('/bundles/:id', verifySeller, updateBundle);
router.delete('/bundles/:id', verifySeller, deleteBundle);
router.get('/bundles/:id/checkDiscount', checkDiscount);

module.exports = router;
