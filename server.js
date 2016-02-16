var express = require('express');
var fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123'
});

connection.connect();

var app = express();

var port = 8000;

app.use(function(req, res, next){
  console.log('Serving request of type: ' + req.method + ' for url ' + req.url);
  next();
});

app.use(express.static(__dirname + '/client'));

app.post('/', function(req, res){
});

app.listen(port);
console.log('Listening to port: ' + port);

connection.end();
module.exports = app;