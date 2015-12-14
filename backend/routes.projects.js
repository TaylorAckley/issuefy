var mongoose  = require('mongoose');
var Project   = require('./models/projects.js');
var moment    = require('moment');
var jwt       = require('jsonwebtoken');
var randtoken = require('rand-token');
var Mailgun   = require('mailgun-js');
var helpers   = require('./helpers.js');



module.exports = function(app) {

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
  html: 'A password reset was requested for your Issuefy account. <a href="http://localhost:3000/resetPassword?token=' + token + '">Click here to reset your password.</a>'
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
