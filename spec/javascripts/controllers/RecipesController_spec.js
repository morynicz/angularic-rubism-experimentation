describe('RecipesController', function(){
  var scope = null;
  var ctrl = null;
  var location = null;
  var routeParams = null;
  var resource = null;

  var setupController = function(keywords) {
    return inject(function($location,
      $routeParams, $rootScope, $resource, $controller) {
      scope = $rootScope.$new();
      location = $location;
      resource = $resource;
      routeParams = $routeParams;
      routeParams.keywords = keywords;
      return ctrl = $controller('RecipesController', {
        $scope: scope,
        $location: location
      });
    });
  };

  beforeEach(module('receta'));
  beforeEach(setupController());

  return it('defaults to no recipes', function() {
    return expect(scope.recipes).toEqualData([]);
  });
});
