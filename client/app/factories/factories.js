var factories = angular.module('factories', [])

//Login Factory
.factory('Login', function($http, $location, $rootScope){
  var loginUser = function(username, password, cb){
    $http({
      method: 'GET',
      url: '/api/login?username='+ username + '&password=' + password
    })
    .then(function(response){
        cb(response.data);
    })
    .catch(function(error){
      throw new Error(error);
    });
  };

  var getFacebookProfile = function(cb){
    $http({
      method: 'GET',
      url: '/profile',
    }).then(function(response){
      $rootScope.id = response.data.id;
      $rootScope.displayName = response.data.displayName;
      cb(response.data);
    }).catch(function(error){
      $location.path('/login');
    });
  }

  var signin = function(username, password, cb){
    $http({
      method:'POST',
      url:'/api/signin',
      data: {
        username: username,
        password: password
      }
    })
    .then(function(response){
      if(response.status === 404){
        $location.path('/login');
      } else {
        cb();  
      }
    })
    .catch(function(err){
      throw new Error(err);
    });
  }

  return {
    loginUser: loginUser,
    signin: signin,
    getFacebookProfile: getFacebookProfile
  }   
})

//Items Factory
.factory('Items', function($http){
  var getAllItems = function(cb, data){
    $http({
      method:'GET',
      url:'/api/item'
    }).then(function(response){
      cb(response.data);
    }).catch(function(err){
      throw new Error(err);
    });
  }
  var deleteItem = function(id, cb){
    $http({
      method:'DELETE',
      url:'/api/item',
      params: {id: id}
    }).then(function(response){
      cb(response.data);
    }).catch(function(err){
      throw new Error(err);
    });
  }
  var searchForItems = function(filter, cb){
    console.log('Filter: ' + filter);
    $http({ 
      method: 'GET',
      url:'/api/item',
      data: {filter: filter, test: 'test'}
    }).then(function(response){
      cb(response.data);
    }).catch(function(err){
      throw new Error(err);
    })
  }
  return {
    getAllItems: getAllItems,
    searchForItems: searchForItems,
    deleteItem: deleteItem
  }
})
.factory('Session', function($http){
  var Session = {
    data: {},
    saveSession: function(){ /*Save session to db*/},
    updateSession: function(){
      $http.get('/api/user/session').then(function(res){ return Session.data = res.data});
    }
  };
  Session.updateSession();
  return Session;
});