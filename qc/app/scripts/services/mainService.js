'use strict';

angular.module('qcApp')
.service('mainServiceObj', function($http) {

    return {

      getStudents: function() {
        var path = ''
          return $http.get(path) ;        
      }
    };
  });
