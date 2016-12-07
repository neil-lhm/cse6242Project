var app = angular.module('recommender');

app.controller('searchPage', 
['$scope', 'sharedVariables', 'features', 'business', 'details', 'searchForBusinesse',
function($scope, sharedVariables, feature, business, details, searchForBusinesse) {

  feature.getFeatures().$promise.then(function(features){
    sharedVariables.setFeatures(features);
    business.getBusinesses().$promise.then(function(businesses){

      sharedVariables.setBusinesses(businesses);
      var businessIds = [];
      for (var key in businesses) businessIds.push(key);
      sharedVariables.setBusinessIds(businessIds);

      details.getDetails().$promise.then(function(details){
        sharedVariables.setDetails(details);
        var startingRecommendations = searchForBusinesse.getHighRatedBusinesses();


        $scope.isFeatureShown = false;

        $scope.restaurants = startingRecommendations;

        $scope.featuresToSearchFor = [];


        $scope.foo = {
          selectedRestaurants : [],
          selectedFeatures : []
        };

        $scope.similarRestaurants = [];
        

        $scope.selectAllFeatures = function() {
          $scope.foo.selectedFeatures = angular.copy($scope.featuresToSearchFor);
        };

        $scope.getSimilarRestaurants = function() {
          var featureIds = [];
          for (var i = 0; i < $scope.foo.selectedFeatures.length; i++) {
            featureIds.push($scope.foo.selectedFeatures[i].id);
          }
          var businessIds = [];
          for (var i = 0; i < $scope.restaurants.length; i++) {
            businessIds.push($scope.restaurants[i].id);
          }
          var similarRestaurants = searchForBusinesse.getSimilarRestaurants(featureIds, businessIds);
          $scope.restaurants = $scope.restaurants.concat(similarRestaurants);
        };
        $scope.selectAllRestaurants = function() {
          $scope.foo.selectedRestaurants = angular.copy($scope.restaurants);
        };


        $scope.findFeaturesOfSelectedRestaurants = function() {
          $scope.featuresToSearchFor = [];
          var visited = [];
          for (var i = 0; i < $scope.foo.selectedRestaurants.length; i++) {
            var restaurant = $scope.foo.selectedRestaurants[i];
            for (var j = 0; j < restaurant.features.length; j++) {
              var feature = restaurant.features[j];
              var featureId = restaurant.featureIds[j];
              if (visited.indexOf(featureId) < 0) {
                $scope.featuresToSearchFor.push({'id': featureId, 'name': feature});
                visited.push(featureId);
              }
            }
          };
          $scope.isFeatureShown = true;
        };

        $scope.resetAllRestaurants = function() {
          $scope.foo.selectedRestaurants = [];
          $scope.restaurants = [];
        };

        $scope.setSelectedRestaurants = function() {
          sharedVariables.setSelectedBusinesses($scope.foo.selectedRestaurants);
        };

        $scope.clearSelection = function() {
          $scope.foo.selectedRestaurants = [];
        };

      })
    })
  });



}
]);