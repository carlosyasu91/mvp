var db = require('./../db');
var USER_ID = 1;
module.exports.handleItemPost = function(req, res){
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
          res.redirect('/#/dashboard');
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
};
module.exports.handleItemGet = function(req, res){
  console.log(req.query);
  console.log(req.params);
  if(!req.body.filter){
    db.Items.findAll().then(function(items){
      res.status(200).send(items);
    });
  } else {
    db.Items.findAll({where:{ 
          name: req.body.filter
        }
     }).then(function(items){
      res.status(200).send(items);
    });
  }
};

module.exports.handleLogin = function(req, res){
  db.Users.findOne({username: req.body.username})
  .then(function(user){

  })
  .catch(function(err){
    throw new Error('Could not find user');
  })
};

module.exports.handleSignIn = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  db.Users.findOne({username: req.body.username})
  .then(function(user){
    if(!user){
      //register
      Users.create({
        username: username, 
        password: password
      })
      .then(function(newUser){
        //create session
        req.session.regenerate(function(err){
          if(err) throw Error('Error while regenerating session');
          req.session.user = username;
        });
        //redirect to dashboard
        res.redirect('/#/dashboard');
      })
      .catch(function(err){
        console.log('Error while creating new user at POST to /api/signin');
      })
    } else {
      //return error, user already exists
      res.status(200).send('User already exists');
    }
  })
  .catch(function(err){
    throw new Error('Error finding user during sign in');
  })
};