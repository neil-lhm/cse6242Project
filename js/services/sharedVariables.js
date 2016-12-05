var app = angular.module('recommender');

app.service('sharedVariables', ['features', 'business', 
function(features, businesses){
    //var allFeatures = features.getFeatures();
    //console.log(allFeatures);
    var allFeatures;
    //var allBusinesses = businesses.getBusinesses();
    var allBusinesses = $.getJSON('../../business.json', function (data){
        return data;
    });

    var businessIds = [];
    for (var key in allBusinesses) businessIds.push(key);

    return {
        setAllFeatures: function(val) {
            allFeatures = val;
        },
        setAllBusinesses: function(val) {
            allBusinesses = val;
        },
        getAllFeatures: function(){
            return allFeatures;
        },
        getAllBusinesses: function() {
            return allBusinesses;
        },
        getBusinessIds: function() {
            return businessIds;
        }
    }

}]);