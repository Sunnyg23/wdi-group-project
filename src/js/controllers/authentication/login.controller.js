angular
.module('veganChef')
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function LoginCtrl(User, CurrentUserService, $state, $rootScope)  {
  const vm = this;

  vm.login = () => {
    User
    .login(vm.user).$promise
    .then(()  =>  {
      CurrentUserService.getUser();
      $rootScope.$broadcast('loggedIn');
      // $state.go('usersIndex');
      // $state.go('account({id: vm.user._id})');
    })
    .catch(err => {
      console.log(err);
    });
  };
}
