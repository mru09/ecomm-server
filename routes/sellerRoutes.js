const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const router = express.Router();

// POST /sellers/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Seller.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const seller = new Seller({ name, email, password: hashed });

    await seller.save();
    res.status(201).json({ message: 'Seller registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /sellers/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, seller.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: seller._id, email: seller.email, role: 'seller' }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, name: seller.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
