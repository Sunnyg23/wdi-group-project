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
    })
    .catch(err => {
      console.log(err);
    });
  };
}
