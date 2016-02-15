var express = require('express');
var fs = require('fs');

var app = express();

var port = 8000;

app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  //read index file
  fs.readFile('public/dashboard.html', function(err, data){
    if(err) throw err;
    //set head to html and send the index
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

app.get('/login', function(req, res){
  fs.readFile('public/login.html', function(err, data){
    if(err) throw err;
    //set head to html and send the index
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
})

app.post('/', function(req, res){
});

app.listen(port);
console.log('Listening to port: ' + port);

module.exports = app;