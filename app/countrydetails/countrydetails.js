"use strict";
controllersModule.controller('CountryDetailsController', function ($scope, capitalPop, neighbours) {
    $scope.capitalPopulation = capitalPop.data.geonames[0].population;
    $scope.neighbours = neighbours.data.geonames;
});