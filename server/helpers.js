var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var hashPassword = function(password){
  var pHash = Promise.promisify(bcrypt.hash);
  return bcrypt.hash(password, null, null);
}
