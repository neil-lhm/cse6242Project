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

    function getBusinesses(featureIdsToSearch, existedBusinessIds) {
        var details = sharedVariables.getDetails();
        var allBusinesses = sharedVariables.getBusinesses();
        var allFeatures = sharedVariables.getFeatures();
        var count = 0;
        var businesses = [];
        //console.log('calling getBusinesses');
        for (var key in details) {
            if (existedBusinessIds.indexOf(key) < 0 || existedBusinessIds.length == 0) {
                var business = details[key];
                if (business['stars'] > 3.5) {
                    business["id"] = key;
                    var featureIdsOfThisBusiness = allBusinesses[key];

                    var isMatch = false;
                    for (var featureId in featureIdsToSearch) {
                        if (featureIdsOfThisBusiness.indexOf(featureId) > -1) {
                            isMatch = true;
                            break;
                        } 
                    }
                    if (isMatch || featureIdsToSearch.length == 0) {
                        //console.log('found matches');
                        var featuresOfThisBusiness = [];
                        var ids = [];
                        for (var k in featureIdsOfThisBusiness) {
                            featuresOfThisBusiness.push(allFeatures[k]);
                            ids.push(k);
                        }
                        business["features"] = featuresOfThisBusiness;
                        business["featureIds"] = ids;
                        businesses.push(business);
                        count += 1;
                    }

                }
                if (count >= numOfBusinessesToSearchFor) break;
            }

        }
        return businesses;
    }

    this.getHighRatedBusinesses = function(){
        return getBusinesses([], []);
    }

    this.getSimilarRestaurants = function(featureIdsToSearch, existedBusinessIds) {
        return getBusinesses(featureIdsToSearch, existedBusinessIds);
    }



}]);