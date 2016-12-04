var app = angular.module('searchApp', ['ngRoute', 'checklist-model'])

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'welcome.html',
        controller: 'setBasicCtrl'
    })
    .when('/search', {
        templateUrl: 'search.html',
        controller: 'setFeatureCtrl'
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

app.controller('setFeatureCtrl', ['$scope',
    function($scope) {
        $scope.restaurants = [
            {name: 'Starbucks', stars: 3.5, category: ['Fast Food','Coffee'], feature: ['good service','fast']},
            {name: 'Panda Express', stars: 3, category: ['Fast Food','Chinese','Restaurants'] , feature: ['good dessert','good service']}
            ];

        $scope.searchfeature = [];


        $scope.user = {
            restaurants: []
        };

        $scope.featurelist = {
            searchfeature: []
        }
        
        $scope.result = [];
        

        $scope.select = function() {
            $scope.featurelist.searchfeature = angular.copy($scope.searchfeature);
        };

        $scope.clear = function() {
            $scope.featurelist.searchfeature = [];
        };

        $scope.show = function() {
            $scope.result = [];
            for (var i = 0; i < $scope.featurelist.searchfeature.length; i++) {
                if ($scope.result.indexOf($scope.featurelist.searchfeature[i]) < 0) {
                    $scope.result.push($scope.featurelist.searchfeature[i]);
                }
            };
            console.log($scope.result);

        };
        $scope.checkAll = function() {
            $scope.searchfeature = [];
            $scope.user.restaurants = angular.copy($scope.restaurants);
            for (var i = 0; i < $scope.user.restaurants.length; i++) {
                for (var j = 0; j < $scope.user.restaurants[i].feature.length; j++) {
                    if ($scope.searchfeature.indexOf($scope.user.restaurants[i].feature[j]) < 0) {
                        $scope.searchfeature.push($scope.user.restaurants[i].feature[j]);
                    }
                }
            };

        };

        $scope.uncheckAll = function() {
            $scope.user.restaurants = [];
            $scope.searchfeature = [];
        };
        $scope.setToNull = function() {
            $scope.user.restaurants = null;
        };

        $scope.search = function() {
            $scope.searchfeature = [];

            for (var i = 0; i < $scope.user.restaurants.length; i++) {
                for (var j = 0; j < $scope.user.restaurants[i].feature.length; j++) {
                    if ($scope.searchfeature.indexOf($scope.user.restaurants[i].feature[j]) < 0) {
                        $scope.searchfeature.push($scope.user.restaurants[i].feature[j]);
                    }
                }
            };
            //$window.open('../CX 4242/Group project/Recommender/resultpage.html')
            console.log($scope.searchfeature);

        };
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
