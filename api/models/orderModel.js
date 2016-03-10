var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var Order = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = Mongoose.model('Order', Order);