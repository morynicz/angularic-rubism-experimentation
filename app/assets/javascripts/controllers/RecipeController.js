angular.module('controllers').controller('RecipeController',[
  '$scope',
  '$routeParams',
  '$resource',
  'flash',
  function($scope,$routeParams,$resource, flash) {
    recipe = $resource('/recipes/:recipeId', {recipeId: "@id", format: "json"});

    recipe.get({
      recipeId: $routeParams.recipeId
    }, function(recipe) {
      $scope.recipe = recipe;
    }, function(httpResponse) {
      $scope.recipe = null;
      flash.error = 'There is no recipe with ID '+$routeParams.recipeId;
    });
  }]);
