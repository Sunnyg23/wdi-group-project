angular
  .module('veganChef')
  .controller('IngredientsShowCtrl', IngredientsShowCtrl);

IngredientsShowCtrl.$inject =
  ['API', '$stateParams', 'Ingredient'];

function IngredientsShowCtrl(API, $stateParams, Ingredient) {
  const vm = this;
  vm.ingredient = Ingredient.get($stateParams);
}
