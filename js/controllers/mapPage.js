var app = angular.module('recommender');

app.controller('mapPage', ['$scope', 'sharedVariables', 
  function($scope, sharedVariables) {
    console.log(sharedVariables.getSelectedBusinesses());
    $scope.restaurants = sharedVariables.getSelectedBusinesses();
    var max_lat = Math.max.apply(Math,$scope.restaurants.map(function(o){return o.latitude;}))
    var min_lat = Math.min.apply(Math,$scope.restaurants.map(function(o){return o.latitude;}))
    var max_lng = Math.max.apply(Math,$scope.restaurants.map(function(o){return o.longitude;}))
    var min_lng = Math.min.apply(Math,$scope.restaurants.map(function(o){return o.longitude;}))
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
    console.log($scope.map);
    $scope.options = {
      scrollwheel: false
    };

    var markers = [];
    for (var i = 0; i < $scope.restaurants.length; i++) {
      var m = {
        id: i,
        latitude: $scope.restaurants[i].latitude,
        longitude: $scope.restaurants[i].longitude,
        title: $scope.restaurants[i].name,
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