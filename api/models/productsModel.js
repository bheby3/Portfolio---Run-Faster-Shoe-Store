/**
 * Created by brandonhebbert on 2/1/16.
 */


var Mongoose = require('mongoose');

var Product = Mongoose.Schema({
    gender: {
      type: String
    },
    brand: {
        type: String
    },
    offset: {
        type: Number
    },
    weight: {
        type: Number
    },
    model: {type: String
    },
    category:
        {type: String}
    ,   //road, trail, track, crossCountry,
    stability: {  //neutral-min, neutral-moderate, support-min, support-mod, support-max, motion-control
        type: String
    },
    styles: {
        type: String
    },
    width: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    image: [
        {type: String}
    ],
    //imageAlt: {
    //    type: String
    //}
});

module.exports = Mongoose.model('products', Product);
