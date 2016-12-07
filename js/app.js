var app = angular.module('recommender', 
['ngRoute', 'checklist-model', 'ngResource', 'ngAnimate', 'ui.bootstrap', 'uiGmapgoogle-maps'])

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: './views/welcome.html',
        controller: 'welcomePage'
    })
    .when('/search', {
        templateUrl: './views/search.html',
        controller: 'searchPage'
    })
    .when('/map', {
        templateUrl: './views/map.html',
        controller: 'mapPage'
    })
});
