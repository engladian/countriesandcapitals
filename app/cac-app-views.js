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
        .when('/countries/:country/:capital', {
            templateUrl: 'countrydetails/countrydetails.html',
            controller: 'CountryDetailsController',
            resolve: {
                capitalPop: function (countriesService, $route) {
                    var capital = $route.current.params.capital;
                    var countryCode = $route.current.params.country;

                    console.log(capital + "-" + countryCode);

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

            console.log(url);

            var promise = $http.get(url,{ cache: true});
            promise.success(function (data) {
                return data;
            });
            return promise;
        },
        getNeighbours: function (countryCode) {
            var url = 'http://api.geonames.org/neighboursJSON?country=' 
                       + countryCode + '&username=engladiannz';

            console.log(url);

            var promise = $http.get(url, { cache: true });
            promise.success(function (data) {
                return data;
            });
            return promise;
        }
    }
});