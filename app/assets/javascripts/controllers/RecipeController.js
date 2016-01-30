angular.module('controllers').controller('RecipeController',[
  '$scope',
  '$routeParams',
  '$resource',
  function($scope,$routeParams,$resource) {
    recipe = $resource('/recipes/:recipeId', {recipeId: "@id", format: "json"});

    recipe.get({
      recipeId: $routeParams.recipeId
    }, function(recipe) {
      $scope.recipe = recipe;
    }, function(httpResponse) {
      $scope.recipe = null;
    });
  }]);
