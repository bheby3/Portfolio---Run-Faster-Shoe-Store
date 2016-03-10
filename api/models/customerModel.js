var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var Customer = new Schema({
    facebookId: {
      type: String
    },
    displayName: {
        type: String
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }]
//    payment: {
//        cardNum: '',
//        provider: {ref}
//    }
});

module.exports = Mongoose.model('Customer', Customer);