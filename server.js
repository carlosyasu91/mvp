var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var handlers = require('./server/handlers');

var port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'myshop'
}));

function restrict(req, res, next){
  console.log('Session:',req.session);
  if(req.session.user){
    next();
  } else {
    req.session.error = 'Access denied!';
    req.redirect('/#/login');
  }
}

// app.use(function(req, res, next){
//   console.log('Serving request of type: ' + req.method + ' for url ' + req.url);
//   next();
// });

app.use(express.static(__dirname + '/client'));

app.get('/api/item', handlers.handleItemGet);
app.post('/api/item', restrict, handlers.handleItemPost);
app.get('/api/login', handlers.handleLogin);
app.post('/api/signin', handlers.handleSignIn);

app.listen(port);

console.log('Listening to port: ' + port);

module.exports = app;