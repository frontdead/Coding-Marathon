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

    var place_id = '';
    var latitude = '';
    var longitude = '';
   	var mapProp= {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:15,
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

	$scope.rating = 'Sometimes there are no ratings for the area!';
	$scope.types ='What type of place is this ? '

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
    	latitude = position.coords.latitude;
    	longitude = position.coords.longitude;    
    }

    $scope.qualityFunc = function() {
      mainServiceObj.getCoordinates(latitude, longitude)
        .then(function(success) {
          place_id = success.data.results[0].place_id;
          //place_id = 'ChIJN1t_tDeuEmsRUsoyG83frY4'

      var mapProp= {
		    center:new google.maps.LatLng(latitude,longitude),
		    zoom:15,
	  };
	  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

          mainServiceObj.getQuality(place_id)
            .then(function(success) {
               $scope.types = success.data.result.types[0];
               if (success.data.result.rating) {
                $scope.rating = success.data.result.rating;      
               
              } else {
                $scope.rating = 'No rating for ' + success.data.result.name;                
              }
            });
        });
     }
  });
