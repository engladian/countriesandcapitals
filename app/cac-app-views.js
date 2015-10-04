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
                 countries: ['countriesService', function (countriesService) {
                     return countriesService.getCountries();
                 }]                                          
             }
         })
        .when('/countries/:country/:capital', {
            templateUrl: 'countrydetails/countrydetails.html',
            controller: 'CountryDetailsController',
            resolve: {
                capitalPop: ['countriesService', '$route', function (countriesService, $route) {
                    var capital = $route.current.params.capital;
                    var countryCode = $route.current.params.country;
                    return countriesService.getCapitalPopulation(countryCode, capital);
                }],
                neighbours: ['countriesService', '$route', function (countriesService, $route) {
                    var countryCode = $route.current.params.country;
                    return countriesService.getNeighbours(countryCode);
                }],
                pickedCountryCode: ['$route', function($route) {
                    return $route.current.params.country;
                }]
            }
        })
        .otherwise('/home');
}]);

//Shared factories
controllersModule.factory('countriesService', ['$http', function ($http) {
    return {
        getCountries: function () {
            var url = 'http://api.geonames.org/countryInfoJSON?username=engladiannz';
            var promise = $http.get(url, { cache: true });
            promise.success(function (data) {
                return data;
            });
            return promise;
        },
        getCapitalPopulation: function (countryCode, capital) {
            var url = 'http://api.geonames.org/searchJSON?country='
                       + countryCode + '&q=' + capital.replace('_', ' ')
                       + '&maxRows=1&name_equals=' + capital.replace('_', ' ')
                       + '&isNameRequired=true&style=LONG&username=engladiannz';
            var promise = $http.get(url,{ cache: true});
            promise.success(function (data) {
                return data;
            });
            return promise;
        },
        getNeighbours: function (countryCode) {
            var url = 'http://api.geonames.org/neighboursJSON?country=' 
                       + countryCode + '&username=engladiannz';
            var promise = $http.get(url, { cache: true });
            promise.success(function (data) {
                return data;
            });
            return promise;
        }
    }
}]);