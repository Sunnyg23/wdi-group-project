angular
.module('veganChef')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider


  .state('home', {
    url: '/',
    templateUrl: 'js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/users/register.html',
    controller: 'RegisterCtrl as register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/users/login.html',
    controller: 'LoginCtrl as login'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl as users'
  });


  $urlRouterProvider.otherwise('/');


}
