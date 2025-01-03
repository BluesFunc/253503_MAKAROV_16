const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number,
  releaseDate: Date,
  poster: String,
  trailerUrl: String,
});

module.exports = mongoose.model('Film', filmSchema);
