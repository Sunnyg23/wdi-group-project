const router          = require('express').Router();
const cuisines        = require('../controllers/cuisines');
const ingredients     = require('../controllers/ingredients');
const recipes         = require('../controllers/recipes');
const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

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
