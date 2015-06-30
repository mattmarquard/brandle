angular.module('brandle').controller('MainCtrl', [
    '$scope',
    'auth',
    function($scope, auth){
			$scope.isLoggedIn = auth.isLoggedIn;
			//TODO: presumably some kind some sort of search feature to find users?
    }
]);