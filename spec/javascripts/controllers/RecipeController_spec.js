describe('RecipeController', function(){
  var scope = null;
  var ctrl = null;
  var routeParams = null;
  var httpBackend = null;
  var recipeId = 42;

  var fakeRecipe = {
    id: recipeId,
    name: 'BakedPotatoes',
    instructions: 'Pierce potato with fork, nuke for 20 minutes'
  };

  var setupController = function(recipeExists = true) {
    inject(function($location,
      $routeParams,
      $rootScope,
      $httpBackend,
      $controller) {
        scope = $rootScope.$new();
        location = $location;
        httpBackend = $httpBackend;
        routeParams = $routeParams;
        routeParams.recipeId = recipeId;

        ctrl = $controller('RecipeController',{
          $scope : scope
        });
    });

    beforeEach(module('receta'));

    afterEach(function(){
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  }
