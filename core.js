'use strict';

angular.module('playerzPassword', [])

.constant('API_ENDPOINT', {
    url: 'https://secret-plateau-96989.herokuapp.com/api'
        //url: "http://localhost:5000/api"
})

.controller('controller', ['$scope', '$http', '$location', 'API_ENDPOINT', function($scope, $http, $location, API_ENDPOINT) {

    var currentPath = window.location.href;
    var splitLocation = window.location.href.split('/');
    var lengthLocation = splitLocation.length;
    var token = splitLocation[lengthLocation - 1];


    $scope.resetPassword = function() {

        $http.post(API_ENDPOINT.url + '/resetPassword', {
                token: token,
                password: $scope.password,
                confPassword: $scope.confPassword
            })
            .success(function(data) {
                //console.log(data);
                $scope.response = data.success;
                $scope.msg = data.msg;
                //alert(`${data.msg}`);
            })
            .error(function(data) {
                //console.log(data);
                $scope.response = data.success;
                $scope.msg = data.msg;
                $scope.password = '';
                $scope.confPassword = '';
                //alert(`${data.msg}`);
            });
        $scope.response = null;
    };

}]);
