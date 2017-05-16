angular
  .module('veganChef')
  .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['User', 'TokenService', 'Cuisine', '$state'];
function AccountCtrl(User, TokenService, Cuisine, $state) {
  const vm = this;
  vm.userId = TokenService.decodeToken().id;
  vm.update = usersUpdate;


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
    // ingredients: [{
    //   measurement: {type: String},
    //   ingredient: {type: mongoose.Schema.ObjectId, ref: 'Ingredient'}
    // }],
    images: {
      small: '',
      large: '',
      others: ['']
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
}
