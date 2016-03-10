var Order = require('../models/orderModel.js');

module.exports = {
    createOrder: function (req, res) {
        var newOrder = new Order(req.body.orderDetails);
        newOrder.save(function (err, saved) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(saved);
        });
    },
};
