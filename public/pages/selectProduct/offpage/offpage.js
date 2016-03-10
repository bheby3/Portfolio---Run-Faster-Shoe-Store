var app = angular.module('app');

app.directive('offpage', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/offpage/offpage.html'
    };
}]);