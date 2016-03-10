/**
 * Created by brandonhebbert on 2/2/16.
 */
var app = angular.module('app');

app.directive('selectproduct', ['$document',function() {
    return {
        restrict: 'E',
        templateUrl: 'pages/Product/product.html',
    };
}]);