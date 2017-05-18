angular
  .module('veganChef')
  .directive('recipe', recipe);

recipe.$inject = [];
function recipe() {
  const directive = {};

  directive.restrict = 'E';
  directive.replace  = true;
  directive.templateUrl = '/js/views/templates/recipe.template.html';
  directive.scope = {
    recipe: '='
  };

  return directive;
}
