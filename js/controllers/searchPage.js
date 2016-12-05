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

      console.log(searchForBusinesse.getBusinessIdsGivenFeatures([1,2]));
      details.getDetails().$promise.then(function(details){
        sharedVariables.setDetails(details);
        var startingRecommendations = searchForBusinesse.getHighRatedBusinesses();
        console.log(startingRecommendations);

        // $scope.restaurants = [
        //   {name: 'Starbucks', stars: 3.5, category: ['Fast Food','Coffee'], feature: ['good service','fast']},
        //   {name: 'Panda Express', stars: 3, category: ['Fast Food','Chinese','Restaurants'] , feature: ['good dessert','good service']}
        // ];
        $scope.restaurants = startingRecommendations;

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
              if ($scope.searchfeature.indexOf($scope.user.restaurants[i].features[j]) < 0) {
                $scope.searchfeature.push($scope.user.restaurants[i].features[j]);
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
            for (var j = 0; j < $scope.user.restaurants[i].features.length; j++) {
              if ($scope.searchfeature.indexOf($scope.user.restaurants[i].features[j]) < 0) {
                $scope.searchfeature.push($scope.user.restaurants[i].features[j]);
              }
            }
          };
        };
      })
    })
  });



}
]);