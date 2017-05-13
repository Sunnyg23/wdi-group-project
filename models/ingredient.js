const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {type: String, trim: true},
  images: {
    small: {type: String, trim: true},
    large: {type: String, trim: true},
    others: [{type: String, trim: true}]
  }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
