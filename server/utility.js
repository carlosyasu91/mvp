var isLoggedIn = function(req){
  return req.session ? !!req.sesssion.user : false;
};

exports.checkUser = function(req, res, next){
  if(!isLoggedIn(req)){
    res.send(401, {message: 'User not authorized'});
  } else {
    next();
  }
}