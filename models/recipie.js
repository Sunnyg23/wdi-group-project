const mongoose = require('mongoose');

const recipieSchema = new mongoose.Schema({
  name: {type: String, trim: true},
  // chef: {type: mongoose.Schema.ObjectId, ref: 'User'},
  instructions: [{
    index: {type: Number},
    content: {type: String}
  }],
  ingredients: [{
    measurement: {type: String},
    ingredient: {type: mongoose.Schema.ObjectId, ref: 'Ingredient'}
  }],
  images: {
    small: {type: String, trim: true},
    large: {type: String, trim: true},
    others: [{type: String, trim: true}]
  }
});

module.exports = mongoose.model('Recipie', recipieSchema);
