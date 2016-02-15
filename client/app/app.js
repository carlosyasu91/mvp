console.log('hey');

var app = angular.module('shopApp', [
  'ngRoute'
  ])
.config(function($routeProvider){
  $routeProvider
  .when('/login', {
    controller: 'loginController',
    templateUrl: 'app/login/login.html'
  })
})
.controller('loginController', function($scope){
  $scope.test = 'Hello';
  $scope.login = function(){

  };
});