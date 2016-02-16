consolen.log('hey');

var app = angular.module('shopApp', ['ngRoute'])
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
  $scope.showmenu = 'false';
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
.controller('menuController', function($scope){
  $scope.template = { name: 'usermenu.html', url:'app/usermenu/usermenu.html' };
})
.controller('dashboardController', function($scope){
  $scope.showmenu = 'true';
})
.controller('createController', function($scope){
  $scope.showmenu = 'true';
});