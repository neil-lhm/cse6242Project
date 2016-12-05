var app = angular.module('recommender');

app.service('searchForBusinesse',['sharedVariables', 
function(sharedVariables){
    var numOfBusinessesToSearchFor = 10;

    this.getBusinessIdsGivenFeatures= function(features) {
        var allbusinessIds = sharedVariables.getBusinessIds();
        var allBusinesses = sharedVariables.getBusinesses();
        var count = 0;
        var businessIds = [];
        for (var id in allbusinessIds) {
            
            if (doesThisBusinessHaveAllTheseFeatures(allBusinesses[allbusinessIds[id]], features)) {
                businessIds.push(allbusinessIds[id]);
                count += 1;
            }
            if (count >= numOfBusinessesToSearchFor) break;
        }
        return businessIds;
    }

    function doesThisBusinessHaveAllTheseFeatures(business, features) {
        var featuresThisBusinessHas = [];
        for (var key in business) {
            featuresThisBusinessHas.push(key);
        }
        //console.log(featuresThisBusinessHas);
        var isMatch = false; 
        for (var feature in features) {
            // -1 means the element is not in array
            isMatch |= featuresThisBusinessHas.indexOf(feature) > -1;
        }
        return isMatch;
    }

    this.getHighRatedBusinesses = function(){
        var details = sharedVariables.getDetails();
        var allBusinesses = sharedVariables.getBusinesses();
        var allFeatures = sharedVariables.getFeatures();
        var count = 0;
        var businesses = [];
        for (var key in details) {
            var business = details[key];
            if (business['stars'] > 3.5) {
                business["id"] = key;
                businesses.push(business);
                var featureIdsOfThisBusiness = allBusinesses[key];
                var featuresOfThisBusiness = [];
                for (var k in featureIdsOfThisBusiness) {
                    featuresOfThisBusiness.push(allFeatures[k]);
                }
                business["features"] = featuresOfThisBusiness;
                count += 1;
            }
            if (count >= numOfBusinessesToSearchFor) break;
        }
        return businesses;
    }


}]);