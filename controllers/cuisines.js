const Cuisine = require('../models/cuisine');


function cuisinesIndex(req, res, next) {
  Cuisine
  .find()
  .exec()
  .then(cuisines => {
    return res.status(200).json(cuisines);
  })
  .catch(err => res.status(500).json(err));
}

function cuisinesShow(req, res, next) {
  Cuisine
    .findById(req.params.id)
    .exec()
    .then(cuisine => {
      if(!cuisine) {
        console.log('No cuisine found - cuisinesShow line 14');
      }
      return res.status(200).json(cuisine);
    })
    .catch(err => res.status(500).json(err));
}

function cuisinesNew(req, res, next) {
  Cuisine
    .create(req.body)
    .then(cuisine => {
      if(!cuisine) {
        console.log('Could not create cuisine - cuisinesNew line 27');
      }
      return res.status(201).json(cuisine);
    })
    .catch(err => res.status(500).json(err));
}

function cuisinesUpdate(req, res, next) {
  Cuisine
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(cuisine => {
      if(!cuisine) return res.status(404).json({message: 'Failed to create cuisine.'});
      return res.status(201).json(cuisine);
    })
    .catch(err => res.status(500).json(err));
}

function cuisinesDelete(req, res, next) {
  Cuisine
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).json({message: 'Deleted!'}))
    .catch(err => res.status(500).json(err));
}

module.exports = {
  index: cuisinesIndex,
  show: cuisinesShow,
  new: cuisinesNew,
  update: cuisinesUpdate,
  delete: cuisinesDelete
};
