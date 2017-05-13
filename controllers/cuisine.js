const Cuisine = require('../models/cuisine');


function cuisineIndex(req, res, next) {
  Cuisine
  .find()
  .exec()
  .then(cuisines => {
    return res.status(200).json(cuisines);
  })
  .catch(err => res.status(500).json(err));
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
    .catch(err => res.status(500).json(err));
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
    .catch(err => res.status(500).json(err));
}

function cuisineUpdate(req, res, next) {
  Cuisine
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(cuisines => {
      if(!cuisines) return res.status(404).json({message: 'Failed to create cuisine.'});
      return res.status(201).json(cuisines);
    })
    .catch(err => res.status(500).json(err));
}

function cuisineDelete(req, res) {
  Cuisine
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204)).json({message: 'Deleted!'})
    .catch(err => res.status(500).json(err));
}

module.exports = {
  index: cuisineIndex,
  show: cuisineShow,
  next: cuisineNew,
  update: cuisineUpdate,
  delete: cuisineDelete
};
