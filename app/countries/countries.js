"use strict";
//Controller
controllersModule.controller
    ('CountriesController',
    ['$rootScope', '$scope', '$location', 'countries',
    function ($rootScope, $scope, $location, countries) {
        $rootScope.countriesArray = countries.data.geonames;

        $scope.goToCountry = function (countryDetails) {
            var url = "/countries/" + countryDetails.countryCode
                      + "/" + countryDetails.capital.replace(' ', '_');
            //Send down the routing path.
            $location.path(url);
        };
    }]);