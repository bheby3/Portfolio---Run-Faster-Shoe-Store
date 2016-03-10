var app = angular.module('app');

app.directive('selectpagemenu', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/selectPageMenu/selectPageMenu.html',
    };
}]);