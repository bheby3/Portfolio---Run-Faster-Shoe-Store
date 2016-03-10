var app = angular.module('app');

app.directive('homemenu', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/homePageMenu/homePageMenu.html',
        controller: 'homeCtrl'
    };
}]);