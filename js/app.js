var app = angular.module('recommender', ['ngRoute', 'checklist-model', 'ngResource'])

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'welcome.html',
        controller: 'setBasicCtrl'
    })
    .when('/search', {
        templateUrl: 'search.html',
        controller: 'searchPage'
    })
    .when('/map', {
        templateUrl: 'map.html',
        controller: 'mainCtrl'
    })
});

app.controller('setBasicCtrl', ['$scope', 
    function($scope) {
        $scope.basic = {}

        $scope.update = function(basic) {
            $scope.basic = angular.copy(basic)
        };
        $scope.reset = function() {
            $scope.basic = {};
        };
        $scope.reset();
    }
]);

app.controller('mainCtrl', ['$scope', 
    function($scope) {
        $scope.restaurants_latlng = [
            {name: 'Starbucks', latitude: 40.3543266, longitude: -79.9007057}, 
            {name: 'Taco bell', latitude: 40.3505527, longitude: -79.8868138},
            {name: 'Dominos', latitude: 40.4088301, longitude: -79.8662107}
        ];
        var max_lat = Math.max.apply(Math,$scope.restaurants_latlng.map(function(o){return o.latitude;}))
        var min_lat = Math.min.apply(Math,$scope.restaurants_latlng.map(function(o){return o.latitude;}))
        var max_lng = Math.max.apply(Math,$scope.restaurants_latlng.map(function(o){return o.longitude;}))
        var min_lng = Math.min.apply(Math,$scope.restaurants_latlng.map(function(o){return o.longitude;}))
        var image = "https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_Location-32.png"

        $scope.map = {
            center: {
                latitude: (max_lat + min_lat)/2,
                longitude: (max_lng + min_lng)/2
            },
            zoom: 10,
            bounds: {
                northeast: {
                    latitude: max_lat + 1,
                    longitude: max_lng + 1
                },
                southwest: {
                    latitude: min_lat - 1,
                    longitude: min_lng - 1
                }
            }
        };
        $scope.options = {
            scrollwheel: false
        };

        var markers = [];
        for (var i = 0; i < $scope.restaurants_latlng.length; i++) {
            var m = {
                id: i,
                latitude: $scope.restaurants_latlng[i].latitude,
                longitude: $scope.restaurants_latlng[i].longitude,
                title: $scope.restaurants_latlng[i].name,
                icon: image,
                show: false
            };
            markers.push(m);
        }

        $scope.clickEventsObject = { 
            mouseover: function (marker, e, model) { 
            model.show = true;
        }, 
            mouseout: function (marker, e, model) {
            model.show = false;
        }};

        $scope.repeatmarkers = markers;
    }
]);
