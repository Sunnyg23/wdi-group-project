angular
  .module('veganChef')
  .controller('IngredientsEditCtrl', IngredientsEditCtrl);

IngredientsEditCtrl.$inject = ['API', '$stateParams', '$state', 'Ingredient'];
function IngredientsEditCtrl(API, $stateParams, $state, Ingredient) {
  const vm = this;

  vm.ingredient = Ingredient.get($stateParams);
  vm.update = ingredientsUpdate;

  function ingredientsUpdate() {
    Ingredient
      .update({ id: $stateParams.id }, vm.ingredient)
      .$promise
      .then(() => {
        $state.go('ingredientsIndex');
      });
  }
}
