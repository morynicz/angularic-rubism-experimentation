angular.module('receta',['templates', 'ngRoute', 'controllers']);

angular.module('receta').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',{
	templateUrl: '_index.html',
	controller: 'RecipesController'
    });
}]);

recipes = [
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

angular.module('controllers').controller('RecipeController',[ '$scope', function($scope){
    
}]);
				
			
