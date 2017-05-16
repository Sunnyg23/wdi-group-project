angular
  .module('veganChef')
  .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['User'];
function AccountCtrl(User) {
  const vm = this;
  // vm.user = User.get($stateParams);

  // console.log(vm.user);
}
