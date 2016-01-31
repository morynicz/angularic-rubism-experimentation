describe('RecipeController', function(){
  var scope = null;
  var ctrl = null;
  var routeParams = null;
  var httpBackend = null;
  var flash = null;
  var location = null;
  var recipeId = 42;

  var fakeRecipe = {
    id: recipeId,
    name: 'BakedPotatoes',
    instructions: 'Pierce potato with fork, nuke for 20 minutes'
  };
  var setupController = function (recipeExists, recipeId) {
    return inject(function($location,
      $routeParams,
      $rootScope,
      $httpBackend,
      $controller,
      _flash_) {
        scope = $rootScope.$new();
        location = $location;
        httpBackend = $httpBackend;
        routeParams = $routeParams;
        if(recipeId) {
          routeParams.recipeId = recipeId;
        }
        flash = _flash_;

        if(recipeId) {
          var request = new RegExp("\/recipes/" + recipeId);
          var results = (recipeExists)?[200, fakeRecipe]:[404];
          httpBackend.expectGET(request).respond(results[0],results[1]);
        }

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
        beforeEach(setupController(true,42));
        return it('loads the given recipe', function() {
          httpBackend.flush();
          return expect(scope.recipe).toEqualData(fakeRecipe);
        });
      });

      describe('recipe is not found', function() {
        beforeEach(setupController(false,42));
        it('loads given recipe', function() {
          httpBackend.flush();
          expect(scope.recipe).toBe(null);
          expect(flash.error).toBe("There is no recipe with ID "+ recipeId);
        });
      });
    });

    describe('create', function() {
      var newRecipe = {
        id: 42,
        name: 'Toast',
        instructions: 'put in toaster, push lever, add butter'
      };

      beforeEach(function() {
        setupController(false,false);
        var request = new RegExp("\/recipes");
        httpBackend.expectPOST(request).respond(201, newRecipe);
      });

      it('post to the backend', function() {
        scope.recipe.name = newRecipe.name;
        scope.recipe.instructions = newRecipe.instructions;
        scope.save();
        httpBackend.flush();
        expect(location.path()).toBe("/recipes/" + newRecipe.id);
      });
    });

    describe('update', function() {
      var updatedRecipe = {
        name: 'Toast',
        instructions: 'put in toaster, push lever, add butter'
      };

      beforeEach(function() {
        setupController(true,42);
        httpBackend.flush();
        var request = new RegExp("\/recipes");
        httpBackend.expectPUT(request).respond(204);
      });

      it('posts to backend', function() {
        scope.recipe.name = updatedRecipe.name;
        scope.recipe.instructions = updatedRecipe.instructions;
        scope.save();
        httpBackend.flush();
        expect(location.path()).toBe("/recipes/" + scope.recipe.id);
      });
    });

    describe('delete', function() {
      beforeEach(function() {
        setupController(true,42);
        httpBackend.flush();
        var request = new RegExp("\/recipes/" + scope.recipe.id);
        httpBackend.expectDELETE(request).respond(204);
      });

      it('posts to the backend', function() {
        scope["delete"]();
        httpBackend.flush();
        expect(location.path()).toBe("/");
      });
    });

  });
