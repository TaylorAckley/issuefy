var mongoose  = require('mongoose');
var User      = require('./models/users.js');
var moment    = require('moment');
var jwt       = require('jsonwebtoken');
var randtoken = require('rand-token');
var Mailgun   = require('mailgun-js');
var helpers   = require('./helpers.js');

var port            				= process.env.PORT || 3000;
var APP_URL           			= process.env.APP_URL || config.APP_URL;
var MONGOLAB_URI           	= process.env.MONGOLAB_URI || config.MONGOLAB_URI;
var MAILGUN_API           	= process.env.MAILGUN_API || config.MAILGUN_API;
var MAILGUN_DOMAIN          = process.env.MAILGUN_DOMAIN || config.MAILGUN_DOMAIN;
var TOKEN_SECRET            = process.env.TOKEN_SECRET || config.TOKEN_SECRET;

module.exports = function(app) {
  // Authorization

  function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

// generate Token

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.sign(payload, TOKEN_SECRET);
}

// get user

app.get('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

app.put('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    //user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});

// login

app.post('/auth/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    console.log(user.email);
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      res.send({ token: createJWT(user) });
    });
  });
});

app.post('/auth/signup', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    var user = new User({
      name: req.body.displayName,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function(err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: createJWT(result) });
    });
  });
});

app.post('/auth/forgotPassword', function(req, res) {
User.findOne({email: req.body.email}, function(err, existingUser) {

if(!existingUser) {
  return res.status(409).send({message: 'Email not found'});
}
var token   = randtoken.generate(8);

User.update({email: req.body.email},{passwordReset: token}, {multi: false}, function(err, numAffected) {
  if(err) {
    return  res.status(409).send({message: 'Error generating token'});
  }
});
var data = {
//Specify email data
  from: 'Issuefy@issuefy.com',
//The email to contact
  to: req.body.email,
//Subject and text data
  subject: 'Password Reset for Issuefy',
  html: 'A password reset was requested for your Issuefy account. <a href="' + APP_URL + '"/resetPassword?token=' + token + '">Click here to reset your password.</a>'
};
helpers.sendMail(data, function(err, result) {
  if (err) {
    console.log(err);
    return res.status(409).send({message: 'Error sending email'});
  }
  res.send({message: 'successfully sent PW reset email'});
});
});
});

app.post('/auth/resetPassword', function(req, res) {
  console.log(req.query.token);
  User.findOne({passwordReset: req.query.token}, function(err, user) {
    if (!user) {
      return res.status(409).send({message: 'Token not found'});
    }
    res.send({message: 'Success', user: user});
  });
  });

  app.post('/auth/resetPasswordDone', function(req, res) {
    User.update({email: req.body.email}, {password: req.body.password}, {multi: false}, function(err, user) {
      if (err) {
        res.status(409).send({message: 'Token not found'});
      }
      res.send({message: 'Password succesfully changed', token: createJWT(user)});
    });

});

};
