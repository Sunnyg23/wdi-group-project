const Recipe = require('../models/recipe');


function recipesIndex(req, res, next) {
  Recipe
  .find()
  .exec()
  .then(recipes => {
    return res.status(200).json(recipes);
  })
  .catch(next);
}

function recipesShow(req, res, next) {
  Recipe
    .findById(req.params.id)
    .exec()
    .then(recipe => {
      if(!recipe) {
        return res.status(404).json({ message: 'No recipe found - recipeShow line 14' });
      }
      return res.status(200).json(recipe);
    })
    .catch(next);
}

function recipesNew(req, res, next) {
  Recipe
    .create(req.body)
    .then(recipe => {
      if(!recipe) {
        console.log('Could not create recipe - recipeNew line 27');
      }
      return res.status(201).json(recipe);
    })
    .catch(next);
}

function recipesUpdate(req, res, next) {
  Recipe
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(recipe => {
      if(!recipe) return res.status(404).json({message: 'Failed to create recipe.'});
      return res.status(201).json(recipe);
    })
    .catch(next);
}

function recipesDelete(req, res, next) {
  Recipe
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).json({message: 'Deleted!'}))
    .catch(next);
}

module.exports = {
  index: recipesIndex,
  show: recipesShow,
  new: recipesNew,
  update: recipesUpdate,
  delete: recipesDelete
};
