angular
  .module('veganChef')
  .controller('RecipesIndexCtrl', RecipesIndexCtrl);

RecipesIndexCtrl.$inject = ['API', 'Recipe'];
function RecipesIndexCtrl(API, Recipe) {
  const vm = this;

  recipesIndex();

  function recipesIndex() {
    vm.recipes = Recipe.query();
  }
}
