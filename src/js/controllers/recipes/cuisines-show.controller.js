angular
  .module('veganChef')
  .controller('CuisinesShowCtrl', CuisinesShowCtrl);

CuisinesShowCtrl.$inject =
  ['API', '$stateParams', 'Cuisine'];

function CuisinesShowCtrl(API, $stateParams, Cuisine) {
  const vm = this;
  vm.cuisine = Cuisine.get($stateParams);
}
