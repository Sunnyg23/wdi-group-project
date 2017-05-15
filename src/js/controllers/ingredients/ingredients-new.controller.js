
angular
  .module('veganChef')
  .controller('IngredientsNewCtrl', IngredientsNewCtrl);

IngredientsNewCtrl.$inject = ['API', '$state', 'Ingredient'];
function IngredientsNewCtrl(API, $state, Ingredient) {
  const vm  = this;

  vm.create = ingredientsCreate;

  function ingredientsCreate(){
    return Ingredient
      .save(vm.ingredient)
      .$promise
      .then(() => {
        $state.go('ingredientsIndex');
      });
  }
}
