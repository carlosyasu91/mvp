var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var db = require('./db');
var app = express();
var bodyParser = require('body-parser');
var util = require('util');
var qt = require('quickthumb');

var port = 8000;
var USER_ID = 1;

app.use(function(req, res, next){
  console.log('Serving request of type: ' + req.method + ' for url ' + req.url);
  next();
});
// app.use(bodyParser());

app.use(express.static(__dirname + '/client'));

app.post('/api/item', function(req, res){
  //get the item from the request body
  // var item = req.body;
  //find the current user
    // item.userid = user.id;
    //Upload image to server
    var form = new formidable.IncomingForm();
    var imageUrl;
    form.uploadDir = __dirname + "/client/data/images";
    form.keepExtensions = true;
    form.on('fileBegin', function(name, file){
      db.Images.max('id').then(function(maxId){
      file.name = `imgid${maxId + 1}_userid${USER_ID}.${file.type.split('/')[1]}`;
      file.path =  __dirname + "/client/data/images/" + file.name;
      imageUrl = file.path;
      });
    });
    form.parse(req, function(err, fields, files){
      if(err) res.send('Please select an image to upload');
      var item = {
        name: fields.name,
        description: fields.description,
        price: fields.price,
        userid: USER_ID
      };
      db.Items.create(item)
      .then(function(newItem){ 
        console.log(imageUrl);
        var image = {
           url: imageUrl,
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
});

app.get('/api/item', function(req, res){

});

app.listen(port);
console.log('Listening to port: ' + port);

module.exports = app;