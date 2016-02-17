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

// --> GET to /api/login
module.exports.handleLogin = function(req, res){
  console.log('QUERY: ');
  console.log(req.query);
  var username = req.query.username;
  db.Users.findOne( { where: { username: req.query.username } } )
  .then(function(user){
    console.log('INSIDE THEN');
    console.log(user);
    if(user){
      console.log('BEFORE REGEN')
      req.session.regenerate(function(err){
        if(err) throw Error('Error while regenerating session');
        req.session.user = username;
      });
    } else {
      res.status(301).send('Redirecting');
    }
  })
  .catch(function(err){
    throw new Error(err);
  })
};

//  --> POST to /api/signin
module.exports.handleSignIn = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  db.Users.findOrCreate({where: {username: username}, defaults: {password: password}})
  .spread(function(user, created){
    console.log(user + ' ' + created);
    req.session.regenerate(function(err){
      if(err) throw Error('Error while regenerating session');
      req.session.user = username;
      //redirect to dashboard
      res.redirect('/#/dashboard');
    });
  })
  .catch(function(err){
    throw new Error(err);
  })
  .catch(function(err){
    throw new Error(err);
  })
};