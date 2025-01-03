const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  timezone: { type: String, default: 'UTC' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
