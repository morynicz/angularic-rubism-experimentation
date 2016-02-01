angular.module('controllers').controller('RecipesController',[
  '$scope',
  '$routeParams',
  '$location',
  '$resource',
  function($scope, $routeParams, $location, $resource) {
    var recipe;
    $scope.search = function(keywords) {
      $location.path("/").search('keywords',keywords);
    }

    recipe = $resource('/recipes/:recipeId', {recipeId: "@id", format: "json"});

    if ($routeParams.keywords) {
      recipe.query({ keywords: $routeParams.keywords}, function(results){
        return $scope.recipes = results;
      });
    } else {
      $scope.recipes = [];
    }

    $scope.view = function(recipeId) {
      return $location.path("/recipes/" + recipeId)
    }

    $scope.newRecipe = function() {
      $location.path("/recipes/new");
    }

    $scope.edit = function(recipeId) {
      $location.path("/recipes" + recipeId + "/edit");
    }
  }
]);
