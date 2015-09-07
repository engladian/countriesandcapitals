"use strict";
//Controller
controllersModule.controller('CountriesController', function ($scope, $location, countries) {
    $scope.countriesArray = countries.data.geonames;
    $scope.goToCountry = function ($location, country) {
        var url = "/countries/country/" + country.countryCode
                  + "/capital/" + country.capital.replace('_', ' ');
        $location.path(url);
    };
});