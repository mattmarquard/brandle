var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var Link = mongoose.model('Link');
var User = mongoose.model('User');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)
  user.save(function (err){
    if(err){ 
      return next(err); 
    }
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json("poop" + info);
    }
  })(req, res, next);
});

router.param('username', function(req, res, next, username) {
  console.log("in route param with username " + username);
  var query = User.findOne({ 'username': username }, function (err, doc){
    if (err){
      console.log("query error in user param method");
    }
  });

  query.exec(function (err, user){
    console.log("exec query. got user: " + user[0].username);
    console.log(user);
    console.log("but can't access its properties: " + user[0].username + " " + user[0]['about']);
    if (err) { 
      console.log("error");
      return next(err); 
    }
    console.log("no error");
    if (!user) { 
      console.log("no user");
      return next(new Error('can\'t find user')); 
    }
    console.log("user was " + user[0].username);
    req.user = user[0];
    return next();
  });
});

router.get('/users/:username', auth, function(req, res, next) {
  console.log("in /user/username");
  res.json(req.username);
});







