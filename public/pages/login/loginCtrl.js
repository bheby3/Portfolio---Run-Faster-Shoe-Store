angular.module('app').controller('loginCtrl', function($scope, authService) {

    authService.getCurrentUser().then(function(user) {
        $scope.user = user;
    });


});