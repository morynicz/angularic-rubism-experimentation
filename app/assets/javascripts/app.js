angular.module('receta',['templates', 'ngRoute', 'controllers']);

angular.module('receta').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',{
	templateUrl: '_index.html',
	controller: 'RecipesController'
    });
}]);

angular.module('controllers',[]);

angular.module('controllers').controller('RecipeController',[ '$scope', function($scope){
}]);
				
			
