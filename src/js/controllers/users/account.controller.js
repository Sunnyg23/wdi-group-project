angular
  .module('veganChef')
  .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['User', 'TokenService', 'Cuisine', 'Ingredient', '$state', 'filterFilter'];
function AccountCtrl(User, TokenService, Cuisine, Ingredient, $state, filterFilter) {
  const vm = this;
  vm.userId = TokenService.decodeToken().id;
  vm.update = usersUpdate;
  vm.createIngredient = createIngredient;

  vm.user = User.get({ id: vm.userId });
  vm.updatedUser = vm.user;


  vm.cuisines = Cuisine.query(cuisines => {
    // console.log(cuisines+' account controller');
  });

  vm.allIngredients = Ingredient.query(ingredients => {
    // console.log(ingredients+' account controller');
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
    const filtered = filterFilter(vm.allIngredients, {name: vm.newIngredient.name});
    if(filtered.length < 1) {
      Ingredient
        .save(vm.newIngredient)
        .$promise
        .then(ingredient => {
          vm.newRecipe.ingredients.push(ingredient._id);
        });
    } else {
      vm.newRecipe.ingredients.push(filtered[0]._id);
    }
  }

}
