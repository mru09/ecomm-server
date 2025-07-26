const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: { type: String, required: true }, // hashed with bcrypt
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);
