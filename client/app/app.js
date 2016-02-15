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
  .when('/dashboard', {
    controller: 'dashboardController',
    templateUrl: 'app/dashboard/dashboard.html'
  })
  .when('/create', {
    controller: 'createController',
    templateUrl: 'app/create/create.html'
  })
  .otherwise({
    redirectTo: '/login'
  });
})
.controller('loginController', function($scope, $location){
  $scope.test = 'Hello';
  $scope.login = function(){
    //check username and password
    if($scope.username === USERNAME && $scope.password === PASSWORD){
      //redirect to dashboard
      $location.path('/dashboard');
    } else {
      //redirect to login
      $location.path('/login');
    }
  };
})
.controller('dashboardController', function($scope){

})
.controller('createController', function($scope){

});