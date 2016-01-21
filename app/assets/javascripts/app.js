angular.module('receta',['templates', 'ngRoute', 'controllers']);

angular.module('receta').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/',{
    templateUrl: '_index.html',
    controller: 'RecipesController'
  });
}]);

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
  }];

  angular.module('controllers',[]);

  angular.module('controllers').controller('RecipesController',[ '$scope', '$routeParams', '$location',
  function($scope, $routeParams, $location) {
    var keywords;
    $scope.search = function(keywords) {
      $location.path("/").search('keywords',keywords);
    }

    if ($routeParams.keywords) {
      keywords = $routeParams.keywords.toLowerCase();
      $scope.recipes = recipes.filter(function(recipe) {
        return recipe.name.toLowerCase().indexOf(keywords) !== -1
      });
    } else {
      $scope.recipes = [];
    }

  }]);
