angular
  .module('veganChef')
  .controller('IngredientsIndexCtrl', IngredientsIndexCtrl);

IngredientsIndexCtrl.$inject = ['API', 'Ingredient'];
function IngredientsIndexCtrl(API, Ingredient) {
  const vm = this;

  ingredientsIndex();

  function ingredientsIndex() {
    vm.ingredients = Ingredient.query();
  }
}
