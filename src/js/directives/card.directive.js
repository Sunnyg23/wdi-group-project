angular
  .module('veganChef')
  .directive('card', card);

card.$inject = [];
function card() {
  const directive = {};

  directive.restrict = 'E';
  directive.replace  = true;
  directive.templateUrl = '/js/views/templates/card.template.html';
  directive.scope = {
    question: '@'
  };

  return directive;
}
