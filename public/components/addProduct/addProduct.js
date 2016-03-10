var app = angular.module('app');

app.directive('addproduct', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'components/addProduct/addProduct.html',
        //controller: 'homeCtrl'
    };
}]);