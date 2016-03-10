var facebookStrategy = require('passport-facebook').Strategy;
var Customer = require('./../models/customerModel.js');
var config = require('../config.js');
var expressSession = require('express-session');
module.exports = function(app, passport) {

    app.use(expressSession(config.express));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new facebookStrategy(config.facebook, function (token, refreshToken, profile, done) {
        // profile: is some of their profile information from facebook that we have access to
        // connect to your database
        //console.log(profile);

        Customer.findOne({facebookId:profile.id}).exec(function(err, customer){
            if(err) {
                done(err);
                return;
            } if (customer) {
                done(null, customer);
                return;
            }Customer.create({ //creating this on the database.
                facebookId: profile.id,
                displayName: profile.displayName
            }, function(err, customer) {
                if(err) {
                    done(err);
                    return;
                } if (customer) {
                    done(null, customer);
                    return;
                }
            })

        })
        //done(null, profile);
        //done function calls next function.  Passes in the profile
    }));

    passport.serializeUser(function (user, done) {
//this is next function.  Serializer decides what
        //will be put on session.  user is the profile.  This encrypts the information for you for that user
        // on that session.
        console.log(user);
        done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
// done is like next in node.  Kept 'done', because they don't want it to break
        console.log(obj);
        done(null, obj); //deserializeUser gets the user off the session.
    });

}