var app = angular.module('recommender');

app.service('sharedVariables',
function(){
  var features;
  var businesses;
  var businessIds;
  var details;

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
    }
  }

});