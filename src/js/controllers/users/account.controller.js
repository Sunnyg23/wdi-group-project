angular
  .module('veganChef')
  .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['User', 'TokenService', 'Cuisine', 'Ingredient', 'Recipe', '$state', 'filterFilter'];
function AccountCtrl(User, TokenService, Cuisine, Ingredient, Recipe, $state, filterFilter) {
  const vm = this;
  vm.userId = TokenService.decodeToken().id;
  vm.update = usersUpdate;
  vm.addIngredient = addIngredient;
  vm.addInstruction = addInstruction;
  vm.createRecipe = createRecipe;

  vm.updatedUser = vm.user;

  function getUser() {
    vm.user = User.get({ id: vm.userId });
  }

  vm.cuisines = Cuisine.query(cuisines => {
    // console.log(cuisines[0].name+' account controller');
  });

  vm.allIngredients = Ingredient.query(ingredients => {
    // console.log(ingredients+' account controller');
  });

  vm.newRecipeCategory = '';
  vm.newRecipe = {
    name: '',
    chef: vm.userId,
    instructions: [],
    ingredients: [],
    images: {
      small: '',
      large: ''
    }
  };

  vm.newIngredientMeasurement = '';

  vm.newIngredient = {
    name: '',
    images: {
      small: ''
    }
  };

  vm.newInstruction = {
    content: ''
  };

  function usersUpdate() {
    User
      .update({ id: vm.userId }, vm.user)
      .$promise
      .then(() => {
        $state.go('account');
      });
  }

  function addIngredient() {
    const filtered = filterFilter(vm.allIngredients, {name: vm.newIngredient.name});
    if(filtered.length < 1) {
      Ingredient
        .save(vm.newIngredient)
        .$promise
        .then(ingredient => {
          console.log(vm.newIngredientMeasurement);
          vm.newRecipe.ingredients.push({
            measurement: vm.newIngredientMeasurement,
            ingredient: ingredient._id
          });
          vm.newIngredientMeasurement = '';
        });
    } else {
      console.log(vm.newIngredientMeasurement);
      vm.newRecipe.ingredients.push({
        measurement: vm.newIngredientMeasurement,
        ingredient: filtered[0]._id
      });
      vm.newIngredientMeasurement = '';
    }
    vm.newIngredient = {
      name: '',
      images: {
        small: ''
      }
    };
  }

  function addInstruction() {
    vm.newRecipe.instructions.push(vm.newInstruction);
    vm.newInstruction = {
      content: ''
    };
  }

  function createRecipe() {
    const filtered = filterFilter(vm.cuisines, {name: vm.newRecipeCategory});
    if(vm.newRecipeCategory !== 'Select one' && vm.newRecipeCategory !== '') {
      Recipe.save(vm.newRecipe)
        .$promise
        .then(recipe => {
          console.log(recipe+' recipe returned');
          filtered[0].recipes.push(recipe._id);
          vm.user.recipes.push(recipe._id);
          usersUpdate();
          return Cuisine
            .update(filtered._id, filtered[0]);
        })
        .then(cuisine => {
          console.log(cuisine.recipes+' after');
          getUser();
        });
    }
  }

  getUser();
}

// const filtered = filterFilter(vm.cuisines, {name: vm.newRecipeCategory});
// filtered[0].recipes.push('id here');
