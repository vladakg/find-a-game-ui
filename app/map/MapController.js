(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('MapController', MapController)

    MapController.$inject = ['$http'];

    function MapController($http) {
        var vm = this;
        vm.geoLocation = {};
        vm.getLocation = getLocation;
        vm.setLocation = setLocation;
        vm.geoError = geoError;
        vm.map = undefined;
        vm.markers = [];
        vm.getMarkers = getMarkers;

        vm.getMarkers();

        vm.getLocation();

        function initMap() {
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: vm.geoLocation//,
                //styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-3"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#f39247"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#f39247"},{"saturation":"0"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ff6f00"},{"saturation":"100"},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#f39247"},{"saturation":"0"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#008eff"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#f3dbc8"},{"saturation":"0"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
            });

            var numOfMarkers = vm.markers.length;
            var marker;
            var currentMarker
            while (numOfMarkers) {
                numOfMarkers--;
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: vm.map
                });
            }
        }

        function getLocation() {
            navigator.geolocation.getCurrentPosition(vm.setLocation, vm.geoError);
        }

        function setLocation(result) {
            vm.geoLocation = {
                lat: parseInt(result.coords.latitude),
                lng: parseInt(result.coords.longitude)
            };
            initMap();
        }

        function geoError(error) {
            console.log(error);
        }

        function getMarkers() {
            // Simple GET request example:
            $http({
                method: 'GET',
                url: '/findAgame/api/Events/listEvents'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }
})();