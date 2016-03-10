var app = angular.module('app');

app.directive('hpmenu', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/menu/hpmenu.html',

    };
}]);
