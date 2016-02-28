var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var handlers = require('./server/handlers');
var passport = require('passport');
var fs = require('fs');
var FacebookStrategy = require('passport-facebook').Strategy;
var ensureLogin = require('connect-ensure-login');
var keys = require('./keys');

var PORT = 8000;

//Facebook login setup
passport.use(new FacebookStrategy({
  clientID: keys.CLIENT_ID, //this CLIENT_ID comes from the facebook developers website
  clientSecret: keys.CLIENT_SECRET, // CLIENT_SECRET from facebook developers
  callbackURL: 'http://localhost:8000/login/facebook/return' //callback url that has to match the one setup in fb developers
}, function(accessToken, refreshToken, profile, cb){
  return cb(null, profile);
}));

//Serializing required for passport to work
passport.serializeUser(function(user, cb){
  cb(null, user);
});
passport.deserializeUser(function(obj, cb){
  cb(null, obj);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'myshop'}));

//Initizalize passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());

function restrict(req, res, next){
  console.log('Session:',req.session);
  if(req.session.user){
    next();
  } else {
    req.session.error = 'Access denied!';
    req.redirect('/');
  }
}


app.use(express.static(__dirname + '/client'));

//facebook login routes
app.get('/login', function(req, res){res.redirect('/#/login');})
app.get('/login/facebook', passport.authenticate('facebook'));
app.get('/login/facebook/return', 
  passport.authenticate('facebook'),
  function(req, res){   
    res.redirect('/#/dashboard');
  }
);

//Route to get the facebook profile of a user
app.get('/profile', ensureLogin.ensureLoggedIn(), 
  function(req, res){
    res.status(200).json(req.user);
});

//Route to logout facebook
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/login');
});

//Items handling API routes
app.get('/api/item', handlers.handleItemGet);
app.post('/api/item', handlers.handleItemPost);
app.delete('/api/item', handlers.handleItemDelete);

//Login and signin routes
app.get('/api/login', handlers.handleLogin);
app.post('/api/signin', handlers.handleSignIn);

app.get('/:username', function(req, res, next){
  //save user to serve the shop for
  var user = req.params.username;
  //get the user products

  //send back an html with the products data on it

  res.status(200).send('This is the site for user: ' + user);
});

app.listen(PORT);

console.log('Listening to port: ' + PORT);

module.exports = app;