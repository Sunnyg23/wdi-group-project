angular
  .module('veganChef')
  .controller('IngredientsIndexCtrl', IngredientsIndexCtrl);

IngredientsIndexCtrl.$inject = ['API', 'Ingredient'];
function IngredientsIndexCtrl(API, Ingredient) {
  const vm = this;
  vm.delete = ingredientsDelete;

  ingredientsIndex();

  function ingredientsIndex() {
    vm.ingredients = Ingredient.query();
  }

  function ingredientsDelete(ingredient) {
    Ingredient
      .delete({ id: ingredient._id })
      .$promise
      .then(() => {
        ingredientsIndex();
      });
  }
}
