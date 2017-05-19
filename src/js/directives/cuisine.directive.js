angular
  .module('veganChef')
  .directive('cuisine', cuisine);

cuisine.$inject = [];
function cuisine() {
  const directive = {};

  directive.restrict = 'E';
  directive.replace  = true;
  directive.templateUrl = '/js/views/templates/cuisine.template.html';
  directive.scope = {
    cuisine: '='
  };

  return directive;
}
