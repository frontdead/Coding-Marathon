'use strict';

/**
 * @ngdoc overview
 * @name qcApp
 * @description
 * # qcApp
 *
 * Main module of the application.
 */
angular
  .module('qcApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/MyPlaces', {
        templateUrl: 'views/myPlaces.html'
    
      })
      .otherwise({
        redirectTo: '/'
      });
  });
