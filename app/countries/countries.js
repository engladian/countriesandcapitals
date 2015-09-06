"use strict";
//Controller
controllersModule.controller('CountriesController', function ($scope, countries) {
    $scope.countriesArray = countries.data.geonames;
});


