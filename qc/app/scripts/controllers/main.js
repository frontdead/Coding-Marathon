'use strict';

/**
 * @ngdoc function
 * @name qcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qcApp
 */

 //bower ngstorage and not ngStorage!

angular.module('qcApp')
  .controller('MainCtrl', function($scope, $localStorage, mainServiceObj) {

    var place_id = '';
    var latitude = '';
    var longitude = '';
   	var mapProp= {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:15,
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

	$scope.rating = 'Sometimes there are no ratings for the area!';
	$scope.types ='What type of place is this ? ';

	//html5 geolocation window when at home
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
    	latitude = position.coords.latitude;
    	longitude = position.coords.longitude;    
    }
     
   //The function for finding place details
    $scope.qualityFunc = function() {
    	//We are calling coordinates in order to use them on the 
    	//second service.
      mainServiceObj.getCoordinates(latitude, longitude)
        .then(function(success) {
          place_id = success.data.results[0].place_id;
          //place_id = 'ChIJN1t_tDeuEmsRUsoyG83frY4'

        //Configuring the map and refreshing with latitude and longitude  
      var mapProp= {
		    center:new google.maps.LatLng(latitude,longitude),
		    zoom:15,
	  };
	  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

	      //Now we are calling the second service for having the data that we need
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
     //The function that we save the places to local storage
     $scope.savePlaces = function() {
     	 $localStorage.typess = $scope.types
     }
  });
