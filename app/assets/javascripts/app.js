angular.module('receta',[
  'templates',
  'ngRoute',
  'ngResource',
  'controllers'
]);

angular.module('receta').config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/',{
      templateUrl: '_index.html',
      controller: 'RecipesController'
    });
  }
]);

angular.module('controllers',['ngResource']);

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
      return recipe.query({ keywords: $routeParams.keywords}, function(results){
        return $scope.recipes = results;
      });
    } else {
      $scope.recipes = [];
    }

  }
]);
