const router      = require('express').Router();
const cuisines    = require('../controllers/cuisine');
const ingredients = require('../controllers/ingredient');
const recipes     = require('../controllers/recipe');

router.route('/cuisines')
.get(cuisines.index);
router.route('/cuisines/:id')
.get(cuisines.show)
.put(cuisines.new)
.delete(cuisines.delete);

router.route('/ingredients')
.get(ingredients.index);
router.route('/ingredients/:id')
.get(ingredients.show)
.put(ingredients.new)
.delete(ingredients.delete);

router.route('/recipes')
.get(recipes.index);
router.route('/recipes/:id')
.get(recipes.show)
.put(recipes.new)
.delete(recipes.delete);

module.exports = router;
