var app = angular.module('recommender', 
['ngRoute', 'checklist-model', 'ngResource', 'ngAnimate', 'ui.bootstrap'])

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'welcome.html',
        controller: 'welcomePage'
    })
    .when('/search', {
        templateUrl: 'search.html',
        controller: 'searchPage'
    })
    .when('/map', {
        templateUrl: 'map.html',
        controller: 'mapPage'
    })
});
