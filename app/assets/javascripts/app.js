angular.module('receta',[
  'templates',
  'ngRoute',
  'ngResource',
  'controllers',
  'angular-flash.service',
  'angular-flash.flash-alert-directive'
]);

angular.module('receta').config([
  '$routeProvider',
  'flashProvider',
  function($routeProvider, flashProvider) {

    flashProvider.errorClassnames.push("alert-danger");
    flashProvider.warnClassnames.push("alert-warning");
    flashProvider.infoClassnames.push("alert-info");
    flashProvider.successClassnames.push("alert-success");

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
