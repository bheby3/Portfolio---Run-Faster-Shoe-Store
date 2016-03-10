var app = angular.module('app');

app.directive('overpronate', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/shoes/shoes.html'
    };
}]);