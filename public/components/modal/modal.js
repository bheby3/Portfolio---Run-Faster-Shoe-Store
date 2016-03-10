var app = angular.module('app');

app.directive('productmodal', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/modal/modal.html'
    };
}]);