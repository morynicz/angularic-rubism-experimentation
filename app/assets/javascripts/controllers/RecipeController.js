angular.module('controllers').controller('RecipeController',[
  '$scope',
  '$routeParams',
  '$resource',
  '$location',
  'flash',
  function($scope,$routeParams,$resource, $location, flash) {
    var recipe = $resource('/recipes/:recipeId', {
      recipeId: "@id",
      format: "json"
    },{
      'save': {
        method: 'PUT'
      },
      'create': {
        method: 'POST'
      }
    });

    if($routeParams.recipeId) {
      recipe.get({
        recipeId: $routeParams.recipeId
      }, function(recipe) {
        $scope.recipe = recipe;
      }, function(httpResponse) {
        $scope.recipe = null;
        flash.error = 'There is no recipe with ID '+$routeParams.recipeId;
      });
    } else {
      $scope.recipe = {};
    }

    $scope.back = function() {
      $location.path('/');
    };

    $scope.edit = function() {
      $location.path("/recipes/" + $scope.recipe.id + "/edit");
    };

    $scope.cancel = function() {
      if($scope.recipe.id) {
        $location.path("/recipes/" + $scope.recipe.id);
      } else {
        $location.path("/");
      }
    };

    $scope.save = function() {
      var onError = function(_httpResponse) {
        return flash.error = "Somethig went wrong";
      };

      if($scope.recipe.id) {
        $scope.recipe.$save((function() {
          $location.path("/recipes/" + $scope.recipe.id);
        }), onError);
      } else {
        recipe.create($scope.recipe, (function(newRecipe) {
          $location.path("/recipes/" + newRecipe.id);
        }), onError);
      }
    };

    $scope["delete"] = function() {
      $scope.recipe.$delete();
      $scope.back();
    };
  }]);
