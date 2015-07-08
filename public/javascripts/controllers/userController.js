angular.module('brandle').controller('UserCtrl', [
    '$scope',
    '$stateParams',
    'user',
    function($scope, $stateParams, user){
			console.log("in controller with username " + $stateParams.username);
			$scope.user = user.get($stateParams.username);
			console.log("back in controller with user " + $scope.user.username);
    }
]);	