var app = angular.module('app');

app.directive('shoes', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/filters/shoes/shoes.html'
    };
}]);