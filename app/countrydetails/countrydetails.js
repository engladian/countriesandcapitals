"use strict";
controllersModule.controller('CountryDetailsController',
['$rootScope', '$scope', '$route','$location', 'capitalPop', 'neighbours',
function ($rootScope, $scope, $route, $location, capitalPop, neighbours) {
    $scope.capitalPopulation = capitalPop.data.geonames[0].population;
    var nCountries = neighbours.data.geonames;
    var countriesArray = $rootScope.countriesArray;
    var countryCode = $route.current.params.country;
    $scope.countryDetails = getCountryDetails(countryCode);
    var path = $location.absUrl().replace($location.path(), '');

    //Image Urls.
    $scope.flagURL = 'http://www.geonames.org/flags/x/' + countryCode.toLowerCase() + '.gif';
    $scope.mapURL = 'http://www.geonames.org/img/country/250/' + countryCode + '.png';

    $scope.neighbours = [];

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

    function getURL(nCountryCode) {
        var nCountryDetails = getCountryDetails(nCountryCode);
        if (nCountryDetails) {
            return path + "/countries/" + nCountryCode + "/"
                   + nCountryDetails.capital.replace(' ', '_');
        }
        return null;
    }
    function getCountryDetails(countryCode) {
        for (var ind = 0; ind < countriesArray.length; ind++) {
            if (countriesArray[ind].countryCode == countryCode) {
                return countriesArray[ind];
            }
        }
        return null;
    }
}]);