var app = angular.module('shopApp', ['ngRoute', 'factories'])
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
  .when('/signin', {
    controller: 'signinController',
    templateUrl: 'app/register/register.html'  
  })
  .when('/search', {
    controller: 'searchController',
    templateUrl: 'app/search/search.html'
  })
  .otherwise({
    redirectTo: '/login'
  });
})
.controller('loginController', function($scope, $location, Login){
  $scope.showmenu = 'false';
  $scope.login = function(){
    //check username and password
    Login.loginUser($scope.username, $scope.password, function(isLogged){
      // $location.path('/dashboard');
    });
    // if($scope.username === TEST_USERNAME && $scope.password === TEST_PASSWORD){
    //   //redirect to dashboard
    //   $location.path('/dashboard');
    // } else {
    //   //redirect to login
    //   $location.path('/login');
    // }
  };
})
.controller('signinController', function($scope, $location, Login){
  $scope.signin = function(){
    Login.loginUser($scope.username, $scope.password, function(){
        $location.path('/dashboard');
    });
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
})
.controller('searchController', function($scope, Items){
  $scope.searchForItems = function(){
    Items.searchForItems($scope.filter ? $scope.filter.search : '', function(data){
      $scope.data = data;
    });
  }
})