var app = angular.module('app');

app.directive('menu', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/menu/menu.html',

    };
}]);
