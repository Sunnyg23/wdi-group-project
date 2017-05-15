angular
  .module('veganChef')
  .controller('CuisinesEditCtrl', CuisinesEditCtrl);

CuisinesEditCtrl.$inject = ['API', '$stateParams', '$state', 'Cuisine'];
function CuisinesEditCtrl(API, $stateParams, $state, Cuisine) {
  const vm = this;
  vm.delete = cuisinesDelete;


  vm.cuisine = Cuisine.get($stateParams);
  vm.update = cuisinesUpdate;

  function cuisinesUpdate() {
    Cuisine
      .update({ id: $stateParams.id }, vm.cuisine)
      .$promise
      .then(() => {
        $state.go('cuisinesIndex');
      });
  }

  function cuisinesDelete() {
    Cuisine
      .delete({ id: vm.cuisine._id })
      .$promise
      .then(() => {
        $state.go('cuisinesIndex');
      });
  }
}
