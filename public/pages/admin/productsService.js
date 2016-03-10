angular.module('app')
    .service('productService', function ($http) {

        this.getUser = function () {
            return $http({
                method: 'GET',
                url: '/customer'
            }).then(function(response) {
                return response.data;
            })
        }

        this.getCustomCart = function () {
            return $http({
                method: 'GET',
                url: '/cart'
            }).then(function (response) {
                //console.log(response);
                return response.data;
            });
        }

        this.removeFromCart = function(product) {
            console.log('service', product);
            return $http({
                method: 'DELETE',
                url: '/cart/' + product
            }).then(function(response) {
                console.log('hit service', response.data);
                return response.data;
            })
        }

        this.getProducts = function () {
            return $http.get('/products').then(function (response) {
                return response.data;
            });
        }

        this.addProducts = function (product) {
            console.log(product);
            return $http({
                method: 'POST',
                data: product,
                url: '/products'
            }).then(function (response) {
                console.log(response);
                return response.data;
            });
        }

        this.removeProducts = function (product) {
            return $http({
                method: 'DELETE',
                url: '/products/' + product,
            }).then(function (response) {
                console.log(response);
                return response;
            });
        }

        this.addToCart = function (product) {
            console.log(product);
            return $http({
                method: 'POST',
                data: {_id: product},
                url: '/cart'
            }).then(function (response) {
                console.log(response);
                return response.data;
            }).catch(function(err) {
                console.log(err);
                return err
            })
        }

    });