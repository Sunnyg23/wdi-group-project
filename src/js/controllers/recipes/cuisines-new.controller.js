
angular
  .module('veganChef')
  .controller('CuisinesNewCtrl', CuisinesNewCtrl);

CuisinesNewCtrl.$inject = ['API', '$state', 'Cuisine'];
function CuisinesNewCtrl(API, $state, Cuisine) {
  const vm  = this;

  vm.create = cuisinesCreate;

  function cuisinesCreate(){
    return Cuisine
      .save(vm.cuisine)
      .$promise
      .then(() => {
        $state.go('cuisinesIndex');
      });
  }
}
