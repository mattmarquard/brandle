angular.module('brandle').config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('user', {username:auth.currentUser()});
        }
      }]
    })
    .state('user', {
      url: '/users/{username}',
      templateUrl: '/users.html',
      controller: 'UserCtrl',
      resolve: {
         user: ['$stateParams', 'user', function($stateParams, user) {
          return user.get($stateParams.username);
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    });
  $urlRouterProvider.otherwise('home');
}]);