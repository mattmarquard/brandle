angular.module('brandle').factory('user', ['$http', '$window', function($http, $window){
  var o = {
  };

  o.get = function(username) {
  	console.log("in user service with username " + username)
    return $http.get('/users/' + username).then(function(res){
    	console.log("back in service with " + res.data.user);
      return res.data;
    });
  };

  return o;
}]);