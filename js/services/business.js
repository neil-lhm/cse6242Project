var app = angular.module('recommender');

app.factory('business', ['$resource', function($resource){
    return $resource('../../business.json', {}, {
        getBusinesses: {
            method:'GET', 
            interceptor: {
                response: function(res) {
                  console.log("get business interceptor, success");
                  sharedVariables.setAllBusinesses(res.data);
                },
                responseError: function(err) {
                  console.log("get business interceptor, error: ");
                }
            },
            isArray: false
        }
    });
}]);