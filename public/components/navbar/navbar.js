var app = angular.module('app');

app.directive('navbar', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/navbar/navbar.html'
    };
}]);