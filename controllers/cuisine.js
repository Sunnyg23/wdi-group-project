const Cuisine = require('../models/cuisine');


function cuisineIndex(req, res, next) {
  Cuisine
  .find()
  .exec()
  .then(cuisine => {
    return res.status(200).json(cuisine);
  })
  .catch(next);
}


module.exports = {
  index: cuisineIndex
};
