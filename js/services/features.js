var app = angular.module('recommender');

app.factory('features', ['$resource', 'sharedVariables', function($resource, sharedVariables){
    return $resource('../../features.json', {}, {
        getFeatures: {
            method:'GET',
            isArray: false
        }
    });
}]);