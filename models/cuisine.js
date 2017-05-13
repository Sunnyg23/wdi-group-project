const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: {type: String, trim: true},
  recipes: [{type: mongoose.Schema.ObjectId, ref: 'Recipe'}],
  images: {
    small: {type: String, trim: true},
    large: {type: String, trim: true},
    others: [{type: String, trim: true}]
  }
});

module.exports = mongoose.model('Cuisine', cuisineSchema);
