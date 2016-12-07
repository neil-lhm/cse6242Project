var app = angular.module('recommender');

app.controller('welcomePage', ['$scope', 'details', 'sharedVariables',
function($scope, details, sharedVariables) {

  details.getDetails().$promise.then(function(details){
    sharedVariables.setDetails(details);

    var uniqueCitiesAndStates = [];
    for (var businessId in details) {
      var business = details[businessId];

      var cityAndState = {
        'city': business['city'],
        'state': business['state']
      };
      if (isUnique(uniqueCitiesAndStates, cityAndState)) {

        uniqueCitiesAndStates.push(cityAndState);
      }
    }
    //console.log(uniqueCitiesAndStates);
    

    $scope.basic = {}

    $scope.update = function(basic) {
        $scope.basic = angular.copy(basic)
    };
    $scope.reset = function() {
        $scope.basic = {};
    };
    $scope.reset();
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