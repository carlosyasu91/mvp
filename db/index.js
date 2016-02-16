var mysql = require('mysql');

var Sequelize = require('sequelize');
var db = new Sequelize('shopdb', 'root', '123', {
  host:'localhost',
  dialect: 'mysql'
});
var Users = db.define('Users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Items = db.define('Items', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  description: Sequelize.STRING,
  imageUrl: Sequelize.STRING
});
Users.sync().then(function(){
  console.log('Users table created');
});
Items.sync().then(function(){
  console.log('Items table created');
})

module.exports = db;