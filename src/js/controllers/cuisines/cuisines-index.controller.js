angular
  .module('veganChef')
  .controller('CuisinesIndexCtrl', CuisinesIndexCtrl);

CuisinesIndexCtrl.$inject = ['API', 'Cuisine'];
function CuisinesIndexCtrl(API, Cuisine) {
  const vm = this;
  vm.delete = cuisinesDelete;

  cuisinesIndex();

  function cuisinesIndex() {
    vm.cuisines = Cuisine.query();
  }

  function cuisinesDelete(cuisine) {
    Cuisine
      .delete({ id: cuisine._id})
      .$promise
      .then(() => {
        cuisinesIndex();
      });
  }
}
