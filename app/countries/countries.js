"use strict";
//Controller
controllersModule.controller('CountriesController', function ($rootScope, $scope, $location, countries) {
    $scope.countriesArray = countries.data.geonames;
    $scope.goToCountry = function (countryDetails) {
        $rootScope.countryDetails = countryDetails;
        var url = "/countries/" + countryDetails.countryCode
                  + "/" + countryDetails.capital.replace(' ', '_');
        $location.path(url);
    };
});