var app = angular.module('recommender');

app.controller('searchPage', 
['$scope', 'sharedVariables', 'features', 'business', 'details', 'searchForBusinesse',
function($scope, sharedVariables, feature, business, details, searchForBusinesse) {
  
  // loadData.loadFeatures().then(function(){
  //   businesses = sharedVariables.getAllFeatures();
  // });
  //var businesses = sharedVariables.getAllFeatures(); 
  //console.log(businesses);
  
  //console.log(sharedVariables.getAllFeatures());

  feature.getFeatures().$promise.then(function(features){
    sharedVariables.setFeatures(features);
    business.getBusinesses().$promise.then(function(businesses){

      sharedVariables.setBusinesses(businesses);
      var businessIds = [];
      for (var key in businesses) businessIds.push(key);
      sharedVariables.setBusinessIds(businessIds);
      //console.log(sharedVariables.getBusinessIds());

      //console.log(searchForBusinesse.getBusinessIdsGivenFeatures([1,2]));
      details.getDetails().$promise.then(function(details){
        sharedVariables.setDetails(details);
        var startingRecommendations = searchForBusinesse.getHighRatedBusinesses();
        // /console.log(startingRecommendations);


        $scope.isFeatureShown = false;

        $scope.restaurants = startingRecommendations;

        $scope.featuresToSearchFor = [];


        $scope.selectedRestaurants = [];

        $scope.selectedFeatures = [];
        $scope.similarRestaurants = [];
        

        $scope.selectAllFeatures = function() {
          $scope.selectedFeatures = angular.copy($scope.featuresToSearchFor);
        };

        $scope.unselectAllFeatures = function() {
          $scope.selectedFeatures = [];
        };

        $scope.getSimilarRestaurants = function() {
          var featureIds = [];
          for (var i = 0; i < $scope.selectedFeatures.length; i++) {
            featureIds.push($scope.selectedFeatures[i].id);
          }
          var businessIds = [];
          for (var i = 0; i < $scope.restaurants.length; i++) {
            businessIds.push($scope.restaurants[i].id);
          }
          console.log(featureIds);
          console.log(businessIds);
          console.log(searchForBusinesse.getSimilarRestaurants(featureIds, businessIds));

        };
        $scope.selectAllRestaurants = function() {
          //$scope.featuresToSearchFor = [];
          $scope.selectedRestaurants = angular.copy($scope.restaurants);
          console.log($scope.selectedRestaurants);
        };

        $scope.unselectedRestaurants = function() {
          $scope.selectedRestaurants = [];
          console.log($scope.selectedRestaurants);
        };
        $scope.setToNull = function() {
          $scope.user.restaurants = null;
        };

        $scope.findFeaturesOfSelectedRestaurants = function() {
          $scope.featuresToSearchFor = [];
          var visited = [];
          for (var i = 0; i < $scope.selectedRestaurants.length; i++) {
            var restaurant = $scope.selectedRestaurants[i];
            for (var j = 0; j < restaurant.features.length; j++) {
              var feature = restaurant.features[j];
              var featureId = restaurant.featureIds[j];
              if (visited.indexOf(featureId) < 0) {
                $scope.featuresToSearchFor.push({'id': featureId, 'name': feature});
                visited.push(featureId);
              }
            }
          };
          console.log($scope.featuresToSearchFor);
          $scope.isFeatureShown = true;
        };



      })
    })
  });



}
]);