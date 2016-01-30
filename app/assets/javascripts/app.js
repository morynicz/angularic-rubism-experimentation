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
    }).when('/recipes/:recipeId', {
      templateUrl: '_show.html',
      controller: 'RecipeController'
    });
  }
]);

angular.module('controllers',['ngResource']);
