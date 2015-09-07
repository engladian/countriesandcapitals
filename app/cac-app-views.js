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
        .when('/countries/:country/capitol/:capitol', {
            templateUrl: 'countrydetails.html',
            controller: 'CountryDetailsController',
            resolve: {
                capitalPop: function (countriesService, $route) {
                    var capital = $route.current.params.capital;
                    var countryCode = $route.current.params.country;
                    return countriesService.getCapitalPopulation(countryCode, capital);
                },
                neighbours: function (countriesService, $route) {
                    var countryCode = $route.current.params.country;
                    return countriesService.getNeighbours(countryCode);
                }
            }
        })
        .otherwise('/home');
}]);

//Shared factories
controllersModule.factory('countriesService', function ($http) {
    return {
        getCountries: function () {
            var url = 'http://api.geonames.org/countryInfoJSON?username=engladiannz';
            var promise = $http.get(url);
            promise.success(function (data) {
                return data;
            });
            return promise;
        },
        getCapitalPopulation: function (countryCode, capital) {
            var country = countryCode;
            var name_equals = capital.replace('_',' ');
            var isNameRequired = 'true';
            var url = 'http://api.geonames.org/search?country='
                       + country + '&name_equals=' + name_equals
                       + '&isNameRequired=' + isNameRequired
                       + '&username=englaldiannz';
            var promise = $http.get(url);
            promise.success(function (data) {
                return data;
            });
            return promise;
        },
        getNeighbours: function (countryCode) {
            var country = countryCode;
            var url = 'http://api.geonames.org/neighboursJSON?country=' 
                       + country + '&username=englaldiannz';
            var promise = $http.get(url);
            promise.success(function (data) {
                return data;
            });
            return promise;
        }
    }
});