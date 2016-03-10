var app = angular.module('app');

app.directive('headers', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/header/header.html'
    };
}]);