'use strict';

/**
 * @ngdoc function
 * @name qcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qcApp
 */
angular.module('qcApp')
  .controller('MainCtrl', function($scope, mainServiceObj) {

    $scope.myFunc = function() {
      mainServiceObj.getStudents()
        .then(function(success) {
          console.log(success)
        });
    }
  });
