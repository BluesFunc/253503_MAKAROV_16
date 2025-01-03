const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  address: String,
  phone: String,
  email: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
  },
  workingHours: String,
});

module.exports = mongoose.model('Contact', contactSchema);
