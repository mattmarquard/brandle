angular.module('brandle').controller('UserCtrl', [
    '$scope',
    '$stateParams',
    'user',
    function($scope, $stateParams, user){
			console.log("in controller with username " + $stateParams.username);
			console.log(user)
			$scope.user = user;
    }
]);	