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

var recipes = [
  {
    id: 1,
    name: 'Baked Potato w/ Cheese'
  },
  {
    id: 2,
    name: 'Garlic Mashed Potatoes'
  },
  {
    id: 3,
    name: 'Potatoes Au Gartin'
  },
  {
    id: 4,
    name: 'Baked Brussel Sprouts'
  }
];

angular.module('controllers',['ngResource']);

angular.module('controllers').controller('RecipesController',[
  '$scope',
  '$routeParams',
  '$location',
  '$resource',
  function($scope, $routeParams, $location, $resource) {
    var keywords;
    $scope.search = function(keywords) {
      $location.path("/").search('keywords',keywords);
      var recipe = $resource('/recipes/:recipeId', {recipeId: "@id", format: "json"});
    }

    if ($routeParams.keywords) {
      recipe.query({ keywords: $routeParams.keywords}, function(result){
        $scope.recipes = results;
      });
    } else {
      $scope.recipes = [];
    }

  }
]);
