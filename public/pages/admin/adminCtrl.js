var app = angular.module('app')
    .controller('mainCtrl', function ($scope, productService, $location) {


            $scope.filter = {
                stability: [],
                brand: [],
                offset: [],
                weight: [],
                category: [],
                gender: []
            }

            $scope.iou = false;
            $scope.customerCart = [];
            $scope.viewProd = {};
            $scope.modal = false;
            $scope.addProductVariable = true;
            $scope.menuVariable = false;
            $scope.adminPage = false;
            $scope.currentUser = undefined;
            adminId = '56c229477856824b0d9619d9'
            $scope.cartTotal = 0;
            $scope.cartItems = 0;

//////////////////// customer
            $scope.ious = function() {
                $scope.iou = !$scope.iou;
            }
            $scope.addProductForm = function () {
                $scope.addProductVariable = !$scope.addProductVariable;
            }
            $scope.toggleMenu = function () {
                $scope.menuVariable = !$scope.menuVariable;
            }
            $scope.addProductToCart = function (product) {
                productService.addToCart(product).then(
                    function (response) {
                        $scope.cartItems += 1;
                        $scope.cartTotal += Number(response.price);
                        $scope.getCustomerCart();
                    }
                )
            }
            $scope.removeProductFromCart = function (product) {
                console.log(product);
                productService.removeFromCart(product).then(
                    function (response) {
                        console.log(response);
                        $scope.cartItems = response.cart.length;
                        //var cart = response.cart;
                        //console.log(cart);
                        //$scope.cartItems = cart.length;
                        //console.log(response);
                        for (var i = 0; i < response.cart.length; i++) {
                            console.log(response.cart[i]);
                            //var total = Number(response.cart[i].price)
                            //console.log(total);
                            //$scope.cartTotal += total;
                        }
                        //console.log($scope.customerCart);
                        $scope.getCustomerCart();
                    })

            }
            $scope.getCustomerCart = function () {
                productService.getCustomCart()
                    .then(function (response) {
                        console.log(response);
                        var cart = response.cart;
                        while ($scope.customerCart.length) {
                            $scope.customerCart.pop();
                        }
                        //console.log(cart);
                        $scope.cartItems = cart.length;
                        $scope.cartTotal = 0;
                        for (var i = 0; i < cart.length; i++) {
                            var total = Number(cart[i].price)
                            //console.log(total);
                            $scope.cartTotal += total;
                        }
                        $scope.customerCart.push(response)
                    })
            }
            $scope.getCurrentUser = function () {
                productService.getUser().then(function (response) {
                    if (response === false) {
                        return;
                    }
                    else {
                        $scope.currentUser = response;
                        $scope.getCustomerCart();
                        if ($scope.currentUser._id === adminId) {
                            $scope.adminPage = true;
                        }
                    }

                    //console.log($scope.currentUser);
                })
            }
            $scope.getCurrentUser();
            $scope.showProductDetails = function (product) {

                $scope.modal = !$scope.modal;
                $scope.viewProd = product;
                //console.log("shoes ", product);
            }
            $scope.hideProd = function () {
                $scope.modal = !$scope.modal;
            }

/////////////////  admin
            $scope.addProduct = function (product) {
                //console.log(product);
                productService.addProducts(product)
                 .then(function (response) {
                 $scope.products.push(response);
                 })
            }
            $scope.removeProduct = function (product) {
                productService.removeProducts(product)
                    .then(function () {
                        productService.getProducts().then(function (response) {
                            $scope.products = response;
                        });
                    });
            };
        
            productService.getProducts().then(function (response) {
                $scope.products = response;
                console.log(response);
            })
///////////////
            /*        $scope.addUser = function (user) {
             productService.addUser(user)
             .then(function (response) {
             $scope.user = response;
             })
             }*/
///////////////////// admin
            $scope.updateStabilityArray = function (type, value) {  ////support type, true or false////
                console.log(type, value);
                if (value) {
                    if ($scope.filter.stability.indexOf(type) === -1) {
                        $scope.filter.stability.push(type);
                    }
                } else {
                    if ($scope.filter.stability.indexOf(type) !== -1) {
                        $scope.filter.stability.splice($scope.filter.stability.indexOf(type), 1);
                    }
                }
                console.log($scope.filter);
            }
            $scope.updateBrandArray = function (type, value) {
                console.log(type, value);
                if (value) {
                    if ($scope.filter.brand.indexOf(type) === -1) {
                        $scope.filter.brand.push(type);
                    }
                } else {
                    if ($scope.filter.brand.indexOf(type) !== -1) {
                        $scope.filter.brand.splice($scope.filter.brand.indexOf(type), 1);
                    }
                }
            }
            $scope.updateOffsetArray = function (type, value) {
                console.log(type, value);
                if (value) {
                    if ($scope.filter.offset.indexOf(type) === -1) {
                        $scope.filter.offset.push(type);
                    }
                } else {
                    if ($scope.filter.offset.indexOf(type) !== -1) {
                        $scope.filter.offset.splice($scope.filter.offset.indexOf(type), 1);
                    }
                }
            }
            $scope.updateWeightArray = function (type, value) {
                console.log(type, value);
                if (value) {
                    if ($scope.filter.weight.indexOf(type) === -1) {
                        $scope.filter.weight.push(type);
                    }
                } else {
                    if ($scope.filter.weight.indexOf(type) !== -1) {
                        $scope.filter.weight.splice($scope.filter.weight.indexOf(type), 1);
                    }
                }
            }
            /*$scope.maleArray = function () {
                $scope.filter.male = true;
                if ($scope.filter.gender.indexOf('male') === -1) {
                    $scope.filter.gender.push('male');

                } else {
                    if ($scope.filter.gender.indexOf('male') !== -1) {
                        $scope.filter.gender.splice($scope.filter.gender.indexOf('male'), 1);
                    }
                }
            }
            $scope.femaleArray = function () {
                $scope.filter.female = true;
                if ($scope.filter.gender.indexOf('female') === -1) {
                    $scope.filter.gender.push('female');

                } else {
                    if ($scope.filter.gender.indexOf('female') !== -1) {
                        $scope.filter.gender.splice($scope.filter.gender.indexOf('female'), 1);
                    }
                }
            }*/

            $scope.updateGenderArray = function (type, value) {
                console.log(type, value);
                if (value) {
                    if ($scope.filter.gender.indexOf(type) === -1) {
                        $scope.filter.gender.push(type);
                    }
                } else {
                    if ($scope.filter.gender.indexOf(type) !== -1) {
                        $scope.filter.gender.splice($scope.filter.gender.indexOf(type), 1);
                    }
                }
            }
            $scope.updateCategoryArray = function (type, value) {
                console.log(type, value);
                if (value) {
                    if ($scope.filter.category.indexOf(type) === -1) {
                        $scope.filter.category.push(type);
                    }
                } else {
                    if ($scope.filter.category.indexOf(type) !== -1) {
                        $scope.filter.category.splice($scope.filter.category.indexOf(type), 1);
                    }
                }
            }
            ///////////////////////
            $scope.resetFilterArray = function () {
//stability
                if ($scope.filter.stability.indexOf('neutralmin') !== -1) {
                    $scope.filter.stability.splice($scope.filter.stability.indexOf('neutralmin'), 1);
                    //$scope.filter.stability = 0;
                    $scope.filter.neutralmin = !$scope.filter.neutralmin;
                }
                if ($scope.filter.stability.indexOf('neutralmod') !== -1) {
                    $scope.filter.stability.splice($scope.filter.stability.indexOf('neutralmod'), 1);
                    $scope.filter.neutralmod = !$scope.filter.neutralmod;
                }
                if ($scope.filter.stability.indexOf('supportmin') !== -1) {
                    $scope.filter.stability.splice($scope.filter.stability.indexOf('supportmin'), 1);
                    $scope.filter.supportmin = !$scope.filter.supportmin;
                }
                if ($scope.filter.stability.indexOf('supportmod') !== -1) {
                    $scope.filter.stability.splice($scope.filter.stability.indexOf('supportmod'), 1);
                    $scope.filter.supportmod = !$scope.filter.supportmod;
                }
                if ($scope.filter.stability.indexOf('supportmax') !== -1) {
                    $scope.filter.stability.splice($scope.filter.stability.indexOf('supportmax'), 1);
                    $scope.filter.supportmax = !$scope.filter.supportmax;
                }
                if ($scope.filter.stability.indexOf('supportmc') !== -1) {
                    $scope.filter.stability.splice($scope.filter.stability.indexOf('supportmc'), 1);
                    $scope.filter.supportmc = !$scope.filter.supportmc;
                }
//brand
                if ($scope.filter.brand.indexOf('Altra') !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf('Altra'), 1);
                    $scope.filter.altra = !$scope.filter.altra;
                }
                if ($scope.filter.brand.indexOf('Asics') !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf('Asics'), 1);
                    $scope.filter.asics = !$scope.filter.asics;
                }
                if ($scope.filter.brand.indexOf('Brooks') !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf('Brooks'), 1);
                    $scope.filter.brooks = !$scope.filter.brooks;
                }
                if ($scope.filter.brand.indexOf('Hoka') !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf('Hoka'), 1);
                    $scope.filter.hoka = !$scope.filter.hoka;
                }
                if ($scope.filter.brand.indexOf('Mizuno') !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf('Mizuno'), 1);
                    $scope.filter.mizuno = !$scope.filter.mizuno;
                }
                if ($scope.filter.brand.indexOf('Nike') !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf('Nike'), 1);
                    $scope.filter.nike = !$scope.filter.nike;
                }
                if ($scope.filter.brand.indexOf('Saucony') !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf('Saucony'), 1);
                    $scope.filter.saucony = !$scope.filter.saucony;
                }
//offset
                if ($scope.filter.offset.indexOf('0') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('0'), 1);
                    $scope.filter.zero = !$scope.filter.zero;
                }
                if ($scope.filter.offset.indexOf('1') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('1'), 1);
                    $scope.filter.one = !$scope.filter.one;
                }
                if ($scope.filter.offset.indexOf('2') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('2'), 1);
                    $scope.filter.two = !$scope.filter.two;
                }
                if ($scope.filter.offset.indexOf('3') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('3'), 1);
                    $scope.filter.three = !$scope.filter.three;
                }
                if ($scope.filter.offset.indexOf('4') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('4'), 1);
                    $scope.filter.four = !$scope.filter.four;
                }
                if ($scope.filter.offset.indexOf('5') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('5'), 1);
                    $scope.filter.five = !$scope.filter.five;
                }
                if ($scope.filter.offset.indexOf('6') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('6'), 1);
                    $scope.filter.six = !$scope.filter.six;
                }
                if ($scope.filter.offset.indexOf('7') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('7'), 1);
                    $scope.filter.seven = !$scope.filter.seven;
                }
                if ($scope.filter.offset.indexOf('8') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('8'), 1);
                    $scope.filter.eight = !$scope.filter.eight;
                }
                if ($scope.filter.offset.indexOf('9') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('9'), 1);
                    $scope.filter.nine = !$scope.filter.nine;
                }
                if ($scope.filter.offset.indexOf('10') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('10'), 1);
                    $scope.filter.ten = !$scope.filter.ten;
                }
                if ($scope.filter.offset.indexOf('11') !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf('11'), 1);
                    $scope.filter.eleven = !$scope.filter.eleven;
                }
//weight
                if ($scope.filter.weight.indexOf('3') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('3'), 1);
                    $scope.filter.wthree = !$scope.filter.wthree;
                }
                if ($scope.filter.weight.indexOf('4') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('4'), 1);
                    $scope.filter.wfour = !$scope.filter.wfour;
                }
                if ($scope.filter.weight.indexOf('5') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('5'), 1);
                    $scope.filter.wfive = !$scope.filter.wfive;
                }
                if ($scope.filter.weight.indexOf('6') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('6'), 1);
                    $scope.filter.wsix = !$scope.filter.wsix;
                }
                if ($scope.filter.weight.indexOf('7') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('7'), 1);
                    $scope.filter.wseven = !$scope.filter.wseven;
                }
                if ($scope.filter.weight.indexOf('8') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('8'), 1);
                    $scope.filter.wweight = !$scope.filter.wweight;
                }
                if ($scope.filter.weight.indexOf('9') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('9'), 1);
                    $scope.filter.wnine = !$scope.filter.wnine;
                }
                if ($scope.filter.weight.indexOf('10') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('10'), 1);
                    $scope.filter.wten = !$scope.filter.wten;
                }
                if ($scope.filter.weight.indexOf('11') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('11'), 1);
                    $scope.filter.weleven = !$scope.filter.weleven;
                }
                if ($scope.filter.weight.indexOf('12') !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf('12'), 1);
                    $scope.filter.wtwelve = !$scope.filter.wtwelve;
                }
//gender
                if ($scope.filter.gender.indexOf('female') !== -1) {
                    $scope.filter.gender.splice($scope.filter.gender.indexOf('female'), 1);
                    $scope.filter.female = !$scope.filter.female;

                }
                if ($scope.filter.gender.indexOf('male') !== -1) {
                    $scope.filter.gender.splice($scope.filter.gender.indexOf('male'), 1);
                    $scope.filter.male = !$scope.filter.male;
                }
//category
                if ($scope.filter.category.indexOf('road') !== -1) {
                    $scope.filter.category.splice($scope.filter.category.indexOf('road'), 1);
                    $scope.filter.road = !$scope.filter.road;
                }
                if ($scope.filter.category.indexOf('trail') !== -1) {
                    $scope.filter.category.splice($scope.filter.category.indexOf('trail'), 1);
                    $scope.filter.trail = !$scope.filter.trail;
                }
                if ($scope.filter.category.indexOf('x-country') !== -1) {
                    $scope.filter.category.splice($scope.filter.category.indexOf('x-country'), 1);
                    $scope.filter.cc = !$scope.filter.cc;
                }
                if ($scope.filter.category.indexOf('track') !== -1) {
                    $scope.filter.category.splice($scope.filter.category.indexOf('track'), 1);
                    $scope.filter.track = !$scope.filter.track;
                }
                if ($scope.filter.category.indexOf('road-racing') !== -1) {
                    $scope.filter.category.splice($scope.filter.category.indexOf('road-racing'), 1);
                    $scope.filter.roadracing = !$scope.filter.roadracing;
                }

            }

        }
    );

app.filter('multiFilter', function () {
    return function (shoes, filter) {  //ng-repeat - passing in each shoe which we are getting from an array of objects(shoes)
        //we are putting on $scope.products on line 120.  filter is the $scope.filter object with arrays of categories
        var results = [];
        console.log(shoes);
        console.log(filter);

        for (var i = 0; i < shoes.length; i++) {  //array of objects

//  stability && brand && offset && weight && gender && category
            if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }


//  stability && brand && offset && weight && gender
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && offset && weight && category  -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset && weight && gender && category -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.weight.indexOf(compareWeight) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1
                        && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }


//  stability && brand && offset && weight  -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && offset && gender  -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && offset && category   -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && weight && gender -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.weight.indexOf(compareWeight) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && weight && category
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.weight.indexOf(compareWeight) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && gender && category - works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }



//  brand && offset && weight && gender     -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.weight.indexOf(compareWeight) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset && weight && category   -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.weight.indexOf(compareWeight) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && weight && gender && category  -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }



//  stability && brand && offset    -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && weight    -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) === -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && gender    -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && category  -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && offset && weight   -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) === -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && offset && gender   -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && offset && category -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }


//  brand && offset && weight       -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) === -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset && gender       -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.gender.indexOf(shoes[i].gender) === -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset && category     -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.category.indexOf(shoes[i].category) === -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && weight && gender   -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.gender.indexOf(shoes[i].gender) === -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && weight && category -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.category.indexOf(shoes[i].category) === -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && weight && gender      -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && weight && category    -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  weight && gender && category    -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.weight.indexOf(compareWeight) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1
                        && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }



//  stability && brand  -works
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length === 0) {
                if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(shoes[i].offset) === -1) {
                    results.push(shoes[i]);
                }
            }
//  stability && offset -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) === -1 && filter.offset.indexOf(compareMe) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && weight -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) === -1
                        && filter.offset.indexOf(compareMe) === -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && gender -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && category -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && weight -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && gender -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && category -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && weight    -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && gender    -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && category
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  weight && gender    -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length > 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.weight.indexOf(compareWeight) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  weight && category - works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.weight.indexOf(compareWeight) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  gender && category - works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.gender.indexOf(shoes[i].gender) !== -1 && filter.category.indexOf(shoes[i].category) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }


//  stability   -works
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length === 0) {
                if (filter.stability.indexOf(shoes[i].stability) !== -1) { //push all the shoes with the same
                    // shoe.stability type as those in the filter.stability array to the results array and ng-repeat of just those shoes
                    results.push(shoes[i]);
                }
            }
//  brand   -works
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length === 0) {
                if (filter.brand.indexOf(shoes[i].brand) !== -1) {
                    results.push(shoes[i]);
                }
            }
//  offset  -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;  //this is a number
                if (compareMe !== null && compareMe !== undefined) { //if the number is not null or undefined.
                    compareMe = compareMe.toString(); //turn it into a string
                }
                //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                if (filter.offset.indexOf(compareMe) !== -1) {
                    results.push(shoes[i]);
                }
            }
//  weight  -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0 && filter.category.length === 0) {
                var compareMe = shoes[i].offset;  //this is a number
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) { //if the number is not null or undefined.
                    compareMe = compareMe.toString(); //turn it into a string
                }
                //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                if (filter.weight.indexOf(compareWeight) !== -1) {
                    results.push(shoes[i]);
                }
            }
//  gender -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0 && filter.category.length === 0) {
                if (filter.gender.indexOf(shoes[i].gender) !== -1) {
                    //console.log(filter.gender.indexOf(shoes[i].gender));
                    results.push(shoes[i]);
                }
            }
// category -works
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0 && filter.category.length > 0) {
                if (filter.category.indexOf(shoes[i].category) !== -1) {
                    //console.log(filter.gender.indexOf(shoes[i].gender));
                    results.push(shoes[i]);
                }
            }


//  all shoes
            else (results.push(shoes[i]));

        }
        //console.log(results);

        return results;

    }
});
///////////////////

/*app.filter('multiFilter', function () {
 return function (shoes, filter) {
 var results = [];

 console.log(filter);

 for (var i = 0; i < shoes.length; i++) {

 if (filter.offset.length > 0) {
 var compareMe = shoes[i].offset;
 if(compareMe !== null && compareMe !== undefined) {
 compareMe = compareMe.toString();
 }

 //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
 if(filter.offset.indexOf(compareMe) !== -1) {
 results.push(shoes[i]);
 }
 }
 if (filter.stability.length > 0 && filter.brand.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.brand.length === 0 && filter.stability.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.stability.length === 0) {
 if (filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 if (filter.offset.length > 0 ) {
 if (filter.offset.indexOf(shoes[i].offset !== -1))
 results.push(shoes[i]);
 }
 }
 console.log(results);

 return results;

 }
 });*/
/*app.filter('multiFilter', function () {
 return function (shoes, filter) {
 var results = [];

 console.log(filter);

 for (var i = 0; i < shoes.length; i++) {


 if (filter.stability.length > 0 && filter.brand.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.brand.length === 0 && filter.stability.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.stability.length === 0) {
 if (filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 //if (filter.offset.length > 0 ) {
 //    if (filter.offset.indexOf(shoes[i].offset !== -1))
 //    results.push(shoes[i]);
 //}

 }
 console.log(results);

 return results;

 }
 });*/


