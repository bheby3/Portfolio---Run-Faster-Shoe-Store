var productModel = require('./../models/productsModel');

module.exports = {

    create: function (req, res, next) {
        var product = new productModel(req.body)
        product.save(function (err, result) {
            if(err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.send(result);
        })
    },
    read: function (req, res) {
        productModel.find({}, function (err, result) {
            res.send(result);
        });
    },
    update: function (req, res) {
        productModel.findByIdAndUpdate(req.query.id, req.body, function (err, result) {
            //use {$set: req.body} if you
            //want to leave everything else alone. send less back.
            //birdModel.findByIdAndUpdate(req.params.id, req.body, function(err, result) { //need change to /api/sighting/id:
            if (err) return res.status(500).send(err);
            else res.send(result);
        })
    },
    delete: function(req, res, next) {
        productModel.findByIdAndRemove(req.params.id, function(err, result) {
            //res.send(result);
            if (err) return res.status(500).send(err);
            next(); //call the next function on the server.js
        })
    }

}
//read: function(req, res) {
//    //birdModel.findOne({}, function(err, result) { //return one ingredient
//    productModel
//    .find(req.query) //this might be a problem
//        .exec()
//        .then(function(err, result) {
//            if(err) return res.status(500).send(err);
//            else res.send(result);
//        })