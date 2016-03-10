//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var passport = require('passport');
var config = require('./api/config.js');

require('./api/controllers/passportCtrl.js')(app, passport);
var productsCtrl = require('./api/controllers/productsCtrl');
var orderCtrl = require('./api/controllers/orderCtrl');
var customerCtrl = require('./api/controllers/customerCtrl');


var mongoUri = "mongodb://localhost:27017/products";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
//once we open the connection call this 'open' function
// can pass in mongo labs and conenct there.
    console.log("successfully connected to mongodb");
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/./public'));

//the order of these three use matter



app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//this is the page they will be directed to after logging in on facebook.
// this is the callback endpoint.  When facebook is done tell passport you are done and got to this url if successful
    successRedirect: '/#/home',
    //go to this url if you're not successful.
    failureRedirect: '/#/login'
}));
app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/#/login');
    console.log('logging out');
});
app.get('/auth/current', function(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.sendStatus(401);
    }
});

//the strategy for passport we are using is 'Facebook'. go auth with
//facebook (takes us to their website).  passport takes over and does auth.
//when they hit this url it will redirect them to facebook to login.

app.get('/products', productsCtrl.read);
app.put('/products', productsCtrl.update);
app.post('/products', productsCtrl.create);
app.delete('/products/:id', productsCtrl.delete, productsCtrl.read);

app.get('/customer', customerCtrl.getCustomer);

app.post('/cart', customerCtrl.addToCart);
app.get('/cart', customerCtrl.getCart);
app.delete('/cart/:id', customerCtrl.removeFromCart);

port = 3000;
app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
