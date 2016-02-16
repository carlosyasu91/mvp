var express = require('express');
var fs = require('fs');
var db = require('./db');
var request = require('request');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

var port = 8000;
var USER_ID = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(function(req, res, next){
//   console.log('Serving request of type: ' + req.method + ' for url ' + req.url);
//   next();
// });

app.use(express.static(__dirname + '/client'));

app.post('/api/item', function(req, res){
    // var imageUrl = '/hardcoded/image/url';
      var item = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        userid: USER_ID,
        imageUrl: req.body.imageUrl
      };
      db.Items.create(item)
      .then(function(newItem){ 
        var image = {
           url: newItem.imageUrl,
           itemid: newItem.id
        }
        db.Images.create(image)
        .then(function(newImage){
          res.status(200).send('Finished uploading image');
        })
        .catch(function(error){
          console.error(error);
          res.json(error);
        });
      })
      .catch(function(error){
        console.error(error);
        res.json(error);
      });
});

app.get('/api/item', function(req, res){
  db.Items.findAll().then(function(items){
    res.status(200).send(items);
  });
});

app.listen(port);
console.log('Listening to port: ' + port);

module.exports = app;