var app = angular.module('recommender');

app.controller('welcomePage', ['$scope', 'details', 'sharedVariables',
function($scope, details, sharedVariables) {


  details.getDetails().$promise.then(function(details){
    sharedVariables.setDetails(details);

    $scope.uniqueCitiesAndStates = [];
    for (var businessId in details) {
      var business = details[businessId];

      var cityAndState = {
        'city': business['city'],
        'state': business['state'],
        'combined' : business['city'] + ',' + business['state']
      };
      if (isUnique($scope.uniqueCitiesAndStates, cityAndState)) {

        $scope.uniqueCitiesAndStates.push(cityAndState);
      }
    }

    $scope.setSelectedCityAndState = function() {
      sharedVariables.setSelectedCityAndState($scope.selectedCityAndState);
    }

  });



  function isUnique(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]['city'] == obj['city'] && arr[i]['state'] == obj['state']) {
        return false;
      }
    }
    return true;
  }

}


]);