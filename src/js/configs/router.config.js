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
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl as users'
  })
  .state('usersEdit', {
    url: '/users',
    templateUrl: '/js/views/users/edit.html',
    controller: 'UsersEditCtrl as users'
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
  .state('cuisinesIndex', {
    url: '/cuisines',
    templateUrl: '/js/views/cuisines/cuisines-index.html',
    controller: 'CuisinesIndexCtrl as cuisines'
  })
  .state('cuisinesShow', {
    url: '/cuisines/:id',
    templateUrl: '/js/views/cuisines/cuisines-show.html',
    controller: 'CuisinesShowCtrl as cuisines'
  })
  .state('cuisinesNew', {
    url: '/cuisines',
    templateUrl: '/js/views/cuisines/cuisines-new.html',
    controller: 'CuisinesNewCtrl as cuisines'
  })
  .state('cuisinesEdit', {
    url: '/cuisines/:id',
    templateUrl: '/js/views/cuisines/cuisines-edit.html',
    controller: 'CuisinesEditCtrl as cuisines'
  })
  .state('ingredientsIndex', {
    url: '/ingredients',
    templateUrl: '/js/views/ingredients/ingredients-index.html',
    controller: 'IngredientsIndexCtrl as ingredients'
  })
  .state('ingredientsShow', {
    url: '/ingredients/:id',
    templateUrl: '/js/views/ingredients/ingredients-show.html',
    controller: 'IngredientsShowCtrl as ingredients'
  })
  .state('ingredientsNew', {
    url: '/ingredients',
    templateUrl: '/js/views/ingredients/ingredients-new.html',
    controller: 'IngredientsNewCtrl as ingredients'
  })
  .state('ingredientsEdit', {
    url: '/ingredients/:id',
    templateUrl: '/js/views/ingredients/ingredients-edit.html',
    controller: 'IngredientsEditCtrl as ingredients'
  })
  .state('recipesIndex', {
    url: '/recipes',
    templateUrl: '/js/views/recipes/recipes-index.html',
    controller: 'RecipesIndexCtrl as recipes'
  })
  .state('recipesShow', {
    url: '/recipes/:id',
    templateUrl: '/js/views/recipes/recipes-show.html',
    controller: 'RecipesShowCtrl as recipes'
  })
  .state('recipesNew', {
    url: '/recipes',
    templateUrl: '/js/views/recipes/recipes-new.html',
    controller: 'RecipesNewCtrl as recipes'
  })
  .state('recipesEdit', {
    url: '/recipes/:id',
    templateUrl: '/js/views/recipes/recipes-edit.html',
    controller: 'RecipesEditCtrl as recipes'
  });

  $urlRouterProvider.otherwise('/');
}
