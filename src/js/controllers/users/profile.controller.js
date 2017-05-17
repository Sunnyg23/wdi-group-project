angular
  .module('veganChef')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$stateParams', 'User'];
function ProfileCtrl($stateParams, User) {
  const vm = this;
  vm.user = User.get($stateParams);
}
