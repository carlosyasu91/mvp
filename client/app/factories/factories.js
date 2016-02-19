var factories = angular.module('factories', [])

//Login Factory
.factory('Login', function($http, $location){
  var loginUser = function(username, password, cb){
    console.log('Username:', username);
    console.log('Password:', password);
    $http({
      method: 'GET',
      url: '/api/login?username='+ username + '&password=' + password
    })
    .then(function(response){
      console.log('Status:',response.status);
      console.log('Data:',response.data);
        cb(response.isLogged);
    })
    .catch(function(error){
      throw new Error(error);
    });
  };

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
        console.log('Signed in'); 
        cb();  
      }
    })
    .catch(function(err){
      throw new Error(err);
    });
  }

  return {
    loginUser: loginUser,
    signin: signin
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
    searchForItems: searchForItems
  }
});