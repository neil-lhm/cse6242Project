var app = angular.module('recommender');

app.factory('business', ['$resource', 'sharedVariables', function($resource, sharedVariables){
    return $resource('../../business.json', {}, {
        getBusinesses: {
            method:'GET', 
            isArray: false
        }
    });
}]);