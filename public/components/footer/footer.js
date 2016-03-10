var app = angular.module('app');

app.directive('foot', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/footer/footer.html'
    };
}]);