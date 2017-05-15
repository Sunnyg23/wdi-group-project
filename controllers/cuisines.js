const Cuisine = require('../models/cuisine');


function cuisinesIndex(req, res, next) {
  Cuisine
  .find()
  .exec()
  .then(cuisines => {
    return res.status(200).json(cuisines);
  })
  .catch(next);
}

function cuisinesShow(req, res, next) {
  Cuisine
    .findById(req.params.id)
    .populate('recipes')
    .exec()
    .then(cuisine => {
      if(!cuisine) res.notFound();
      return res.status(200).json(cuisine);
    })
    .catch(next);
}

function cuisinesNew(req, res, next) {
  Cuisine
    .create(req.body)
    .then(cuisine => {
      return res.status(201).json(cuisine);
    })
    .catch(next);
}

function cuisinesUpdate(req, res, next) {
  Cuisine
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(cuisine => {
      if(!cuisine) return res.notFound();
      return res.status(201).json(cuisine);
    })
    .catch(next);
}

function cuisinesDelete(req, res, next) {
  Cuisine
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).json({message: 'Deleted!'}))
    .catch(next);
}

module.exports = {
  index: cuisinesIndex,
  show: cuisinesShow,
  new: cuisinesNew,
  update: cuisinesUpdate,
  delete: cuisinesDelete
};
