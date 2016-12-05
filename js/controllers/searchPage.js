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


        $scope.user = {
          restaurants: []
        };

        $scope.featurelist = {
          featuresToSearchFor: []
        }
        
        $scope.result = [];
        

        $scope.select = function() {
          $scope.featurelist.featuresToSearchFor = angular.copy($scope.featuresToSearchFor);
        };

        $scope.clear = function() {
          $scope.featurelist.featuresToSearchFor = [];
        };

        $scope.show = function() {
          $scope.result = [];
          for (var i = 0; i < $scope.featurelist.featuresToSearchFor.length; i++) {
            if ($scope.result.indexOf($scope.featurelist.featuresToSearchFor[i]) < 0) {
              $scope.result.push($scope.featurelist.featuresToSearchFor[i]);
            }
          };
          console.log($scope.result);

        };
        $scope.checkAll = function() {
          $scope.featuresToSearchFor = [];
          $scope.user.restaurants = angular.copy($scope.restaurants);

          console.log($scope.user.restaurants);
          $scope.user.restaurants.forEach(function(restaurant){

            restaurant.features.forEach(function(feature){
              if ($scope.featuresToSearchFor.indexOf(feature) > -1) {
                $scope.featuresToSearchFor.push(feature);
              }
            })
          });
          // for (var restaurant in $scope.user.restaurants ) {
          //   var featuresOfCurRestaurant = restaurant.features;
          //   for (var feature in featuresOfCurRestaurant) {
          //     $scope.featuresToSearchFor.push(feature);
          //   }
          // };
          console.log($scope.featuresToSearchFor);

        };

        $scope.uncheckAll = function() {
          $scope.user.restaurants = [];
          $scope.featuresToSearchFor = [];
        };
        $scope.setToNull = function() {
          $scope.user.restaurants = null;
        };

        $scope.search = function() {
          $scope.featuresToSearchFor = [];

          for (var i = 0; i < $scope.user.restaurants.length; i++) {
            for (var j = 0; j < $scope.user.restaurants[i].features.length; j++) {
              if ($scope.featuresToSearchFor.indexOf($scope.user.restaurants[i].features[j]) < 0) {
                $scope.featuresToSearchFor.push($scope.user.restaurants[i].features[j]);
              }
            }
          };
          $scope.isFeatureShown = true;
        };



      })
    })
  });



}
]);