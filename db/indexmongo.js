//This file was going to be used because we were tempted to use mongo
//We can probably delete this file if we're comfortable with SQL 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect();

var usersSchema = new Schema({
  username: String,
  password: String
});
