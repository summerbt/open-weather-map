angular.module('OWMApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            })
            .when('/cities/:city', {
                templateUrl: 'city.html',
                controller: 'CityCtrl',
                resolve: {
                    city: function (owmCities, $route, $location) {
                        var city = $route.current.params.city;
                        if (owmCities.indexOf(city) === -1) {
                            $location.path('/error');
                            return;
                        }
                        return city;
                    }
                }
            })
            .when('/error', {
                template: '<p>Error - Page Not Found</p>'
            })
            .otherwise('/error');
}])
    .value('owmCities', ['New York', 'Dallas', 'Chicago'])
    .controller('HomeCtrl', function ($scope) {
        //pass
    })
    .controller('CityCtrl', ['$scope', 'city', function ($scope, city) {
        $scope.city = city;
    }]);
