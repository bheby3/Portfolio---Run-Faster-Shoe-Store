var app = angular.module('app');

app.directive('adminshoes', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/filters/shoes/adminShoes.html'
    };
}]);