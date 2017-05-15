angular
  .module('veganChef')
  .controller('RecipesEditCtrl', RecipesEditCtrl);

RecipesEditCtrl.$inject = ['API', '$stateParams', '$state', 'Recipe'];
function RecipesEditCtrl(API, $stateParams, $state, Recipe) {
  const vm = this;

  vm.recipe = Recipe.get($stateParams);
  vm.update = recipesUpdate;

  function recipesUpdate() {
    Recipe
      .update({ id: $stateParams.id }, vm.recipe)
      .$promise
      .then(() => {
        $state.go('recipesIndex');
      });
  }
}
