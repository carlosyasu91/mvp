var factories = angular.module('factories', [])
.factory('Login', function($http){
  var loginUser = function(username, password){
    $http({
      method: 'GET',
      url: '/api/login'
    })
    .then(function(response){
      
    })
    .catch(function(error){
      throw new Error(error);
    });
  };
  return {
    loginUser: loginUser
  }   
})
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