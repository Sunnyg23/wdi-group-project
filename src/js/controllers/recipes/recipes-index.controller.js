angular
  .module('veganChef')
  .controller('RecipesIndexCtrl', RecipesIndexCtrl);

RecipesIndexCtrl.$inject = ['API', 'Recipe'];
function RecipesIndexCtrl(API, Recipe) {
  const vm = this;
  vm.delete = recipesDelete;

  recipesIndex();

  function recipesIndex() {
    vm.recipes = Recipe.query();
  }

  function recipesDelete(recipe) {
    Recipe
      .delete({ id: recipe._id })
      .$promise
      .then(() => {
        recipesIndex();
      });
  }
}
