angular.module('app', [])
       .controller('CountriesController', function ($scope, $location, $http, CustomService) {

           $http.get('countries.json').success(function (data) {
               $scope.countries = data
           })

       })

describe('CustomService', function () {
    beforeEach(angular.mock.module('app'))

    // assumes CustomService has a method getCounter() and increment()
    it('increments the counter', function () {
        angular.mock.inject(function (CustomService) {
            expect(CustomService.getCounter()).toEqual(0);
            CustomService.increment()
            expect(CustomService.getCounter()).toEqual(1);
        })
    });
});

describe('CountriesController', function () {
    var mockScope, mockLocation, backend

    beforeEach(angular.mock.inject(function ($httpBackend) {
        backend = $httpBackend
        backend.expect('GET', 'countries.json').respond([
            { name: 'new zealand' },
            { name: 'australia' }
        ])
    }));

    beforeEach(inject(function ($rootScope, $controller, $location) {
        mockLocation = $location;

        mockScope = $rootScope.$new();

        $controller('CountriesController', {
            $scope: mockScope,
            $location: mockLocation
        });

        backend.flush()
    }));

    it('should assign the countries data', function () {
        expect(mockScope.countries.length).toEqual(2);
    });

    it('should have a method to check if the path is active', function () {
        mockScope.goToCountry({
            countryCode: 'US',
            capital: 'Washington'
        });
        expect(mockLocation.path()).toBe('/countries/US/Washington');
    });
});
