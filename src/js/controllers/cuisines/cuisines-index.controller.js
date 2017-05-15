angular
  .module('veganChef')
  .controller('CuisinesIndexCtrl', CuisinesIndexCtrl);

CuisinesIndexCtrl.$inject = ['API', 'Cuisine'];
function CuisinesIndexCtrl(API, Cuisine) {
  const vm = this;

  cuisinesIndex();

  function cuisinesIndex() {
    vm.cuisines = Cuisine.query();
  }
}
