angular
.module('veganChef')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [];
function MainCtrl() {
  const vm = this;
  vm.test = 'test';
}
