"use strict";
var controllersModule = angular.module('cacApp.Controllers', ['ngRoute']);

//Shared Routing
controllersModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
         .when('/home', {
             templateUrl: 'home/home.html'
         })
         .when('/countries', {
             templateUrl: 'countries/countries.html',
             controller: 'CountriesController',
             resolve: {           
                 countries: function (countriesService) {
                     return countriesService.getCountries();
                 }                                          
             }
         })
        .otherwise('/home');
}]);

//Shared factory
controllersModule.factory('countriesService', function ($http) {
    return {
        getCountries: function () {
            var promise = $http.get('http://api.geonames.org/countryInfoJSON?username=engladiannz');
            promise.success(function (data) {
                return data;
            });
            return promise;
        }
    }
});
