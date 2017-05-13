const Cuisine = require('../models/cuisine');


function cuisineIndex(req, res, next) {
  Cuisine
  .find()
  .exec()
  .then(cuisines => {
    return res.status(200).json(cuisines);
  })
  .catch(next);
}

function cuisineShow(req, res, next) {
  Cuisine
    .findById(req.params.id)
    .exec()
    .then(cuisines => {
      if(!cuisines) {
        console.log('No cuisine found - CuisineShow line 14');
      }
      return res.status(200).json(cuisines);
    })
    .catch(next);
}

function cuisineNew(req, res, next) {
  Cuisine
    .create(req.body)
    .then(cuisines => {
      if(!cuisines) {
        console.log('Could not create cuisine - cuisineNew line 27');
      }
      return res.status(201).json(cuisines);
    })
    .catch(next);
}

module.exports = {
  index: cuisineIndex,
  show: cuisineShow,
  next: cuisineNew
};
