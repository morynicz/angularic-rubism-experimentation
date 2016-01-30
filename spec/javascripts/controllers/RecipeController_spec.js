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
  var setupController = function (recipeExists) {
    return inject(function($location,
      $routeParams,
      $rootScope,
      $httpBackend,
      $controller) {
        scope = $rootScope.$new();
        location = $location;
        httpBackend = $httpBackend;
        routeParams = $routeParams;
        routeParams.recipeId = recipeId;

        var request = new RegExp("\/recipes/" + recipeId);

        var results = (recipeExists)?[200, fakeRecipe]:[404];
        httpBackend.expectGET(request).respond(results[0],results[1]);
        ctrl = $controller('RecipeController',{
          $scope : scope
        });
      });
    };
    beforeEach(module('receta'));

    afterEach(function(){
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('controller initialization', function() {
      describe('recipe is found', function() {
        beforeEach(setupController(true));
        return it('loads the given recipe', function() {
          httpBackend.flush();
          return expect(scope.recipe).toEqualData(fakeRecipe);
        });
      });
      describe('recipe is not found', function() {
        beforeEach(setupController(false));
        it('loads given recipe', function() {
          httpBackend.flush();
          expect(scope.recipe).toBe(null);
        });
      });
    });
  });
