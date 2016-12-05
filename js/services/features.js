var app = angular.module('recommender');

app.factory('features', ['$resource', 'sharedVariables', function($resource, sharedVariables){
    return $resource('../../features.json', {}, {
        getFeatures: {
            method:'GET',
            interceptor: {
                response: function(res) {
                  console.log("get features interceptor, success");
                  sharedVariables.setAllFeatures(res.data);
                },
                responseError: function(err) {
                  console.log("get features interceptor, error: ");
                }
            },
            isArray: false
        }
    });
}]);