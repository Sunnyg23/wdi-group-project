angular
.module('veganChef')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    // $state.go('account({id: vm.user._id})');
    $state.go('usersIndex');
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });

  vm.logout = () => {
    CurrentUserService.removeUser();
  };

}
