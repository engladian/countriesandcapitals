"use strict";
controllersModule.controller('CountryDetailsController',
['$rootScope', '$scope','$location', 'pickedCountryCode', 'capitalPop', 'neighbours',
function ($rootScope, $scope, $location, pickedCountryCode, capitalPop, neighbours) {
    $scope.capitalPopulation = capitalPop.data.geonames[0].population;
    var nCountries = neighbours.data.geonames;
    var countriesArray = $rootScope.countriesArray;

    function getCountryDetails(countryCode) {
        for (var ind = 0; ind < countriesArray.length; ind++) {
            if (countriesArray[ind].countryCode === countryCode) {
                return countriesArray[ind];
            }
        }
        return null;
    }

    $scope.countryDetails = getCountryDetails(pickedCountryCode);
    var path = $location.absUrl().replace($location.path(), '');

    //Image Urls.
    $scope.flagURL = 'http://www.geonames.org/flags/x/' + pickedCountryCode.toLowerCase() + '.gif';
    $scope.mapURL = 'http://www.geonames.org/img/country/250/' + pickedCountryCode + '.png';

    $scope.neighbours = [];

    function getURL(nCountryCode) {
        var nCountryDetails = getCountryDetails(nCountryCode);
        if (nCountryDetails) {
            return path + "/countries/" + nCountryCode + "/"
                + nCountryDetails.capital.replace(' ', '_');
        }
        return null;
    }

    for (var ind = 0; ind < nCountries.length; ind++) {
        var ctryName = nCountries[ind].countryName;
        if (ind + 1 < nCountries.length) {
            ctryName = ctryName + ',';
        }
        $scope.neighbours[ind] = {
            name: ctryName,
            url: getURL(nCountries[ind].countryCode)
        };
    }
}]);