var app = angular.module('shopApp', ['ngRoute', 'factories'])
.config(function($routeProvider){
  $routeProvider
  .when('/login', {
    controller: 'loginController',
    templateUrl: 'app/login/login.html'
  })
  .when('/dashboard', {
    controller: 'dashboardController',
    templateUrl: 'app/dashboard/dashboard.html',
    authenticate: true
  })
  .when('/create', {
    controller: 'createController',
    templateUrl: 'app/create/create.html',
    authenticate: true
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
.run(function($rootScope, $location, Login){
  $rootScope.$on('$routeChangeStart', function(event, next){
    if(next.$$route && next.$$route.authenticate && !$rootScope.id){
      $location.path('/login');
      Login.getFacebookProfile(function(profile){
        $rootScope.id = profile.id;
        $rootScope.displayName = profile.displayName;
      });
    }
  });
})
.controller('loginController', function($scope, $location, Login){
  
  $scope.showmenu = 'false';
  
  $scope.getProfile = function(){
    Login.getFacebookProfile(function(profile){ 
      console.log(profile);
    });
  };

  $scope.login = function(){
    //check username and password
    Login.loginUser($scope.username, $scope.password, function(data){
      // $location.path('/dashboard');
      if(data && data.message){
        $scope.message = data.message;
      } else {
        $location.path('/dashboard');
      }
    });
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
  $scope.deleteItem = function(id){
    Items.deleteItem(id, function(response){
      $scope.message = response.message;
      Items.getAllItems(function(data){
        $scope.data = data;
      });
    });
  }
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