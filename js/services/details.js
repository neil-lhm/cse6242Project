var app = angular.module('recommender');

app.factory('details', ['$resource', 'sharedVariables', function($resource, sharedVariables){
    return $resource('../../details.json', {}, {
        getDetails: {
            method:'GET', 
            isArray: false
        }
    });
}]);