describe('RecipesController', function(){
  var scope = null;
  var ctrl = null;
  var location = null;
  var routeParams = null;
  var resource = null;

  var httpBackend = null;

  var setupController = function(keywords,results) {
    return inject(function($location,
      $routeParams, $rootScope, $resource, $httpBackend, $controller) {
      scope = $rootScope.$new();
      location = $location;
      resource = $resource;
      routeParams = $routeParams;
      routeParams.keywords = keywords;
      httpBackend = $httpBackend;

      if (results) {
        var request = new RegExp("\/recipes.*keywords=" + keywords);
        httpBackend.expectGET(request).respond(results);
      }
      ctrl = $controller('RecipesController', {
        $scope: scope,
        $location: location
      });
    });
  };

  beforeEach(module('receta'));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('controller initialization', function() {
    describe('when no keywords present', function() {
      beforeEach(setupController());
      it('defaults to no recipes', function() {
        expect(scope.recipes).toEqualData([]);
      });
    });

    describe('with keywords', function() {
      var keywords = 'foo';
      var recipes = [
        {
          id: 2,
          name: 'Baked Potatoes'
        },
        {
          id: 4,
          name: 'Potatoes Au Gratin'
        }
      ];

      beforeEach(function() {
        setupController(keywords, recipes);
        httpBackend.flush();
      });
      it('calls the back-end', function () {
        expect(scope.recipes).toEqualData(recipes);
      });
    });
  });

  describe('search()', function() {
    beforeEach(function() {
      setupController();
    });

    it('redirects to itself with a keyword param', function () {
      var keywords = 'foo';
      scope.search(keywords);
      expect(location.path()).toBe("/");
      expect(location.search()).toEqualData({
        keywords: keywords
      });
    });
  });
});
