angular
  .module('veganChef')
  .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['User', 'TokenService', 'Cuisine', 'Ingredient', '$state'];
function AccountCtrl(User, TokenService, Cuisine, Ingredient, $state) {
  const vm = this;
  vm.userId = TokenService.decodeToken().id;
  vm.update = usersUpdate;
  vm.createIngredient = createIngredient;

  vm.user = User.get({ id: vm.userId });
  vm.updatedUser = vm.user;


  vm.cuisines = Cuisine.query(cuisines => {
    console.log(cuisines+' account controller');
  });

  vm.newRecipe = {
    name: '',
    chef: vm.userId,
    instructions: [{
      content: ''
    }],
    ingredients: [],
    images: {
      small: '',
      large: '',
      others: ['']
    }
  };

  vm.newIngredient = {
    name: '',
    images: {
      small: ''
    }
  };

  function usersUpdate() {
    User
      .update({ id: vm.userId }, vm.user)
      .$promise
      .then(() => {
        $state.go('account');
      });
  }

  function createIngredient() {

    Ingredient
      .save(vm.newIngredient)
      .$promise
      .then(ingredient => {
        vm.newRecipe.ingredients.push(ingredient._id);
      });
  }

  function getIngredients() {
    vm.allIngredients = Ingredient.query();
  }
}
