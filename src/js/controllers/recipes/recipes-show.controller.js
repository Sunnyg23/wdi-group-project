angular
  .module('veganChef')
  .controller('RecipesShowCtrl', RecipesShowCtrl);

RecipesShowCtrl.$inject =
  ['API', '$stateParams', 'Recipe'];

function RecipesShowCtrl(API, $stateParams, Recipe) {
  const vm = this;
  vm.recipe = Recipe.get($stateParams);
}
