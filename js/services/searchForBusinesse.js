var app = angular.module('recommender');

app.service('searchForBusinesse',['sharedVariables', 
function(sharedVariables){
    var numOfBusinessesToSearchFor = 6;

    this.getBusinessIdsGivenFeatures= function(features) {
        var allbusinessIds = sharedVariables.getBusinessIds();
        var allBusinesses = sharedVariables.getBusinesses();
        var count = 0;
        var businessIds = [];
        for (var id in allbusinessIds) {
            
            if (doesThisBusinessHaveSomeOfTheseFeatures(allBusinesses[allbusinessIds[id]], features)) {
                businessIds.push(allbusinessIds[id]);
                count += 1;
            }
            if (count >= numOfBusinessesToSearchFor) break;
        }
        return businessIds;
    }

    function doesThisBusinessHaveSomeOfTheseFeatures(business, features) {
        var featuresThisBusinessHas = [];
        for (var key in business) {
            featuresThisBusinessHas.push(key);
        }
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
                if (business['stars'] > 3.5 && isCityAndStateMatch(business, sharedVariables.getSelectedCityAndState())) {
                    business["id"] = key;
                    var featureIdsOfThisBusiness = [];
                    for (var k in allBusinesses[key]) featureIdsOfThisBusiness.push(k);
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
                        //console.log(featureIdsOfThisBusiness);
                        for (var i = 0; i < featureIdsOfThisBusiness.length; i++) {
                            //console.log(k);
                            featuresOfThisBusiness.push(allFeatures[featureIdsOfThisBusiness[i]]);
                            ids.push(featureIdsOfThisBusiness[i]);
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
        console.log(businesses);
        return businesses;
    }

    this.getHighRatedBusinesses = function(){
        return getBusinesses([], []);
    }

    this.getSimilarRestaurants = function(featureIdsToSearch, existedBusinessIds) {
        return getBusinesses(featureIdsToSearch, existedBusinessIds);
    }

    function isCityAndStateMatch(business, cityAndState) {
        return business['city'] == cityAndState ['city'] && business['state'] == cityAndState['state'];
    }



}]);