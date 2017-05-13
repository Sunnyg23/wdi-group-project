const router      = require('express').Router();
const cuisines    = require('../controllers/cuisines');
const ingredients = require('../controllers/ingredients');
const recipes     = require('../controllers/recipes');

router.route('/cuisines')
.get(cuisines.index)
.post(cuisines.new);
router.route('/cuisines/:id')
.get(cuisines.show)
.put(cuisines.update)
.delete(cuisines.delete);

router.route('/ingredients')
.get(ingredients.index)
.post(ingredients.new);
router.route('/ingredients/:id')
.get(ingredients.show)
.put(ingredients.update)
.delete(ingredients.delete);

router.route('/recipes')
.get(recipes.index)
.post(recipes.new);
router.route('/recipes/:id')
.get(recipes.show)
.put(recipes.update)
.delete(recipes.delete);

module.exports = router;
