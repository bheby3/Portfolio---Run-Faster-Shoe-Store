var app = angular.module('app');

app.directive('showall', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/filters/showall/showall.html'
    };
}]);