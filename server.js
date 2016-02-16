var express = require('express');
var fs = require('fs');
var db = require('./db');
var app = express();
var bodyParser = require('body-parser');

var port = 8000;

app.use(function(req, res, next){
  console.log('Serving request of type: ' + req.method + ' for url ' + req.url);
  next();
});
app.use(bodyParser());

app.use(express.static(__dirname + '/client'));

app.post('/api/item', function(req, res){
  var item = req.body;
  item.imageUrl = '/hardcoded/image/url';
  item.userid = 1;
  db.Items.create(item).then(function(newItem){
    res.json(newItem);
  });
});

app.get('/api/item', function(req, res){

});

app.listen(port);
console.log('Listening to port: ' + port);

module.exports = app;