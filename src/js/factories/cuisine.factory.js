angular
.module('veganChef')
.factory('Cuisine', cuisineFactory);

cuisineFactory.$inject = ['API', '$resource'];
function cuisineFactory(API, $resource){
  return $resource(`${API}/cuisines/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}
