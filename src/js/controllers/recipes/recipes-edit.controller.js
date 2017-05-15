angular
  .module('veganChef')
  .controller('RecipesEditCtrl', RecipesEditCtrl);

RecipesEditCtrl.$inject = ['API', '$stateParams', '$state', 'Recipe'];
function RecipesEditCtrl(API, $stateParams, $state, Recipe) {
  const vm = this;
  vm.delete = recipesDelete;


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

  function recipesDelete() {
    Recipe
      .delete({ id: vm.recipe._id })
      .$promise
      .then(() => {
        $state.go('recipesIndex');
      });
  }
}
