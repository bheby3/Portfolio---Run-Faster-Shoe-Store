var Customer = require('../models/customerModel.js');
var Product = require('../models/productsModel.js');
module.exports = {

    getCustomer: function(req, res) {
      if (req.isAuthenticated()){
          res.send(req.user)
      } else {
          res.status(401).send(false);
          return;
      }
    },

    addToCart: function (req, res) {
        Customer.findById(req.user._id, function(err, customer){
            console.log("in function");
            if (err){
                res.sendStatus(500);
                return;
            }
            customer.cart.push(req.body._id);
            customer.save();
            console.log(customer.cart);
            console.log("in customer find");
            //res.send(customer);

            Product.findById(req.body._id, function(err, product) {
                console.log("in product find");
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                else {

                    res.send(product);
                }
            });

        })

    },

    removeFromCart: function(req, res) {
        console.log(req.params.id);
        Customer.findById(req.user._id, function(err, customer) {
            console.log("indside cartFunc");
            console.log(req.params.id);
            var cart = customer.cart;
            if (err) {
                res.sendStatus(500);
                return;
            }
            else {
                console.log("loop");
                for (var i = 0; i < cart.length; i++) {

                    if (cart[i].toString() === req.params.id.toString()) {
                        //console.log(cart[i]);
                        cart.splice(i, 1);
                        customer.save( function(err, result) {
                            if (err) {
                                console.log('getting err');
                                res.sendStatus(500);
                            } else {
                                console.log('no error');
                                res.send(result);
                            }
                        });
                        return;
                    }
                }
            }
        })
    },
    getCart: function (req, res) {
        console.log('Getting Cart');
        Customer.findOne({_id: req.user._id}).populate('cart').exec(function(err, customer){
            if (err){
                res.sendStatus(500);
                return;
            }
            var options = {path:"cart"}
            console.log('Get Customer: ', customer);
            res.send(customer);
        })

    }
    /*getCart: function (req, res) {
        console.log('Getting Cart');
        Customer.findOne({_id: req.user._id}).populate('cart').exec(function(err, customer){
            if (err){
                res.sendStatus(500);
                return;
            }
            console.log('Get Customer: ', customer);
            res.send(customer);
        })

    }*/

};