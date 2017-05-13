const Ingredient = require('../models/ingredient');


function ingredientsIndex(req, res, next) {
  Ingredient
  .find()
  .exec()
  .then(ingredients => {
    return res.status(200).json(ingredients);
  })
  .catch(err => res.status(500).json(err));
}

function ingredientsShow(req, res, next) {
  Ingredient
    .findById(req.params.id)
    .exec()
    .then(ingredient => {
      if(!ingredient) {
        console.log('No ingredient found - ingredientShow line 14');
      }
      return res.status(200).json(ingredient);
    })
    .catch(err => res.status(500).json(err));
}

function ingredientsNew(req, res, next) {
  Ingredient
    .create(req.body)
    .then(ingredient => {
      if(!ingredient) {
        console.log('Could not create ingredient - ingredientNew line 27');
      }
      return res.status(201).json(ingredient);
    })
    .catch(err => res.status(500).json(err));
}

function ingredientsUpdate(req, res, next) {
  Ingredient
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(ingredient => {
      if(!ingredient) return res.status(404).json({message: 'Failed to create ingredient.'});
      return res.status(201).json(ingredient);
    })
    .catch(err => res.status(500).json(err));
}

function ingredientsDelete(req, res, next) {
  Ingredient
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).json({message: 'Deleted!'}))
    .catch(err => res.status(500).json(err));
}

module.exports = {
  index: ingredientsIndex,
  show: ingredientsShow,
  new: ingredientsNew,
  update: ingredientsUpdate,
  delete: ingredientsDelete
};
