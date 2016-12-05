var app = angular.module('recommender');

app.service('searchForBusinesseGivenFeature',['sharedVariables', 
function(sharedVariables){
    var features = sharedVariables.getAllFeatures();
    var allBusinesses = sharedVariables.getAllBusinesses();
    var businessIds = sharedVariables.getBusinessIds();

    var numOfBusinessesToSearchFor = 10;

    this.getBusinessGivenFeatures= function(features) {
        var count = 0;
        var businesses = [];
        for (var id in businessIds) {
            count += 1;
            if (doesThisBusinessHaveAllTheseFeatures(id, features)) {
                businesses.push(allBusinesses[id]);
            }
            if (count >= numOfBusinessesToSearchFor) break;
        }
        return businesses;
    }

    function doesThisBusinessHaveAllTheseFeatures(businessId, features) {
        var business = businesses[businessId];
        var featuresThisBusinessHas = [];
        for (var key in featuresThisBusinessHas) {
            featuresThisBusinessHas.push(key);
        }
        var isMatch = True; 
        for (var feature in features) {
            // -1 means the element is not in array
            isMatch &= featuresThisBusinessHas.indexOf(feature) > -1;
        }
        return isMatch;
    }

}]);