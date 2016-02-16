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
    if($scope.username === TEST_USERNAME && $scope.password === TEST_PASSWORD){
      //redirect to dashboard
      $location.path('/dashboard');
    } else {
      //redirect to login
      $location.path('/login');
    }
  };
})
.factory('Items', function($http){
  var getAllItems = function(cb){
    $http({
      method:'GET',
      url:'/api/item'
    }).then(function(response){
      cb(response.data);
    }).catch(function(err){
      throw new Error(err);
    });
  }
  return {
    hello: 'hello',
    getAllItems: getAllItems
  }
})
.controller('menuController', function($scope){
  $scope.template = { name: 'usermenu.html', url:'app/usermenu/usermenu.html' };
})
.controller('dashboardController', function($scope, Items){
  Items.getAllItems(function(data){
    $scope.data = data;
  });
  $scope.showmenu = 'true';
})
.controller('createController', function($scope){
  $scope.showmenu = 'true';
});