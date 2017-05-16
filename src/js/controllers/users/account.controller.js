angular
  .module('veganChef')
  .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['User', 'TokenService', 'Cuisine', '$state'];
function AccountCtrl(User, TokenService, Cuisine, $state) {
  const vm = this;
  vm.currentUser = TokenService.decodeToken().id;
  vm.update = usersUpdate;


  vm.cuisines = Cuisine.query(cuisines => {
    console.log(cuisines+' account controller');
  });

  vm.newRecipe = {
    name: '',
    chef: vm.currentUser,
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
      .update({ id: vm.currentUser }, vm.user)
      .$promise
      .then(() => {
        $state.go('cuisinesIndex');
      });
  }
}
