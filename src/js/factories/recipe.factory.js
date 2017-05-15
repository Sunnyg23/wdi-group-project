angular
.module('veganChef')
.factory('Recipe', recipeFactory);

recipeFactory.$inject = ['API', '$resource'];
function recipeFactory(API, $resource){
  return $resource(`${API}/recipes/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}
