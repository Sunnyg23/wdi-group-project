
angular
  .module('veganChef')
  .controller('RecipesNewCtrl', RecipesNewCtrl);

RecipesNewCtrl.$inject = ['API', '$state', 'Recipe'];
function RecipesNewCtrl(API, $state, Recipe) {
  const vm  = this;

  vm.create = recipesCreate;

  function recipesCreate(){
    return Recipe
      .save(vm.recipe)
      .$promise
      .then(() => {
        $state.go('recipesIndex');
      });
  }
}
