const Ingredient = require('../models/ingredient');


function ingredientsIndex(req, res, next) {
  Ingredient
  .find()
  .exec()
  .then(ingredients => {
    return res.status(200).json(ingredients);
  })
  .catch(next);
}

function ingredientsShow(req, res, next) {
  Ingredient
    .findById(req.params.id)
    .exec()
    .then(ingredient => {
      if(!ingredient) {
        return res.notFound();
      }
      return res.status(200).json(ingredient);
    })
    .catch(next);
}

function ingredientsNew(req, res, next) {
  Ingredient
    .create(req.body)
    .then(ingredient => {
      return res.status(201).json(ingredient);
    })
    .catch(next);
}

function ingredientsUpdate(req, res, next) {
  Ingredient
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(ingredient => {
      if(!ingredient) return res.notFound();
      return res.status(201).json(ingredient);
    })
    .catch(next);
}

function ingredientsDelete(req, res, next) {
  Ingredient
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).json({message: 'Deleted!'}))
    .catch(next);
}

module.exports = {
  index: ingredientsIndex,
  show: ingredientsShow,
  new: ingredientsNew,
  update: ingredientsUpdate,
  delete: ingredientsDelete
};
