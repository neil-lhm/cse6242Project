var app = angular.module('recommender');

app.service('sharedVariables',
function(){
  var features;
  var businesses;
  var businessIds;
  var details;
  var selectedCityAndState;

  return {
    setFeatures: function(val) {
      features = val;
    },
    setBusinesses: function(val) {
      businesses = val;
    },
    setBusinessIds: function(val) {
      businessIds = val;
    },
    setDetails: function(val) {
      details = val;
    },
    setSelectedCityAndState: function(val) {
      selectedCityAndState = val;
    },
    getFeatures: function(){
      return features;
    },
    getBusinesses: function() {
      return businesses;
    },
    getBusinessIds: function() {
      return businessIds;
    },
    getDetails: function() {
      return details;
    },
    getSelectedCityAndState: function() {
      return selectedCityAndState;
    }
  }

});