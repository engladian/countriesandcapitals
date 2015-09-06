"use strict";
var appModule = angular.module('cacApp', ['cacApp.Controllers',   //MUST HAVE VIEWS MODULE AS DEPENDENCY HERE
                                           'ngRoute',
                                           'ngAnimate']);

appModule.controller('ButtonsController', function ($scope, $location) {
    $scope.hideButton = function (route) {
        return route === $location.path();
    };
});

appModule.run(function ($rootScope, $timeout) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 500); //Half second wait
    });
});



