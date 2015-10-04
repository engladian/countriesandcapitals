///<reference path="~/lib/jasmine/jasmine.js"/>
///<reference path="~/bower_components/angular/angular.js"/>
///<reference path="~/bower_components/angular-route/angular-route.js"/>
///<reference path="~/bower_components/angular-mocks/angular-mocks.js"/>
///<reference path="~/app/cac-app.js"/>
///<reference path="~/app/cac-app-views.js"/>
///<reference path="~/app/home/home.js"/>
///<reference path="~/app/countries/countries.js"/>
///<reference path="~/app/countrydetails/countrydetails.js"/>
///<reference path="controllersSpec.js"/>


//describe('CustomService', function () {
//    beforeEach(angular.mock.module('app'))

//    // assumes CustomService has a method getCounter() and increment()
//    it('increments the counter', function () {
//        angular.mock.inject(function (CustomService) {
//            expect(CustomService.getCounter()).toEqual(0);
//            CustomService.increment()
//            expect(CustomService.getCounter()).toEqual(1);
//        })
//    });
//});


describe('Testing the CountriesController', function () {
    var mockScope, mockLocation;
    var mockCountriesData = { data: { geonames: [{ capital: 'X', countryCode: 'X' }, { capital: 'X', countryCode: 'X' }] } };

    //Run before each controller test - initialize module and controller 
    beforeEach(function () {
        // load the module you're testing.
        module('cacApp.Controllers');

        beforeEach(inject(function ($rootScope, $controller, $location) {
            mockLocation = $location;
            mockScope = $rootScope.$new();
            $controller('CountriesController', {
                $scope: mockScope,
                $location: mockLocation,
                countries: mockCountriesData
            });
        }));
    });

    //Test assignments
    it('should assign the countries data', function () {
        expect(mockScope.countriesArray.length).toEqual(2);
    });

    //Test the methods.
    it('should have a method to check if the path is active', function () {
        mockScope.goToCountry({
            countryCode: 'US',
            capital: 'Washington'
        });
        expect(mockLocation.path()).toBe('/countries/US/Washington');
    });
});

describe('Testing the CountryDetailsController', function () {
    var mockRootScope, mockScope, mockLocation;
    var mockCapitalPop = { data: { geonames: [{ population: '99999' }] } };
    var mockNeighbours = { data: { geonames: ['countryA', 'countrtyB', 'countryC'] } };
    var mockCountryCode = 'US';

    //Run before each controller test - initialize module and controller 
    beforeEach(function () {
        // load the module you're testing.
        module('cacApp.Controllers');

        beforeEach(inject(function ($rootScope, $controller, $location) {
            mockLocation = $location;
            mockRootScope = $rootScope.$new();
            mockScope = $rootScope.$new();
            mockRootScope.countriesArray = [{ capital: 'Washington', countryCode: 'US' }, { capital: 'London', countryCode: 'GB' }];
            $controller('CountryDetailsController', {
                $rootScope: mockRootScope,
                $scope: mockScope,
                $location: mockLocation,
                pickedCountryCode: mockCountryCode,
                capitalPop: mockCapitalPop,
                neighbours: mockNeighbours
            });
        }));
    });

    //Test assignments
    it('should assign the capital population', function () {
        expect(mockScope.capitalPopulation).toEqual('99999');
    });

    //
    it('should assign country deatils based on the route', function () {
        expect(mockScope.countryDetails.capital).toEqual('Washington');
    });

    //Test the neighbours are all captured.
    it('should have the correct number of neighbours', function () {
        expect(mockScope.neighbours.length).toEqual(3);
    });
});