"use strict";

var mongoose  = require('mongoose');
var Issues    = require('./models/issues.js');
var Projects  = require('./models/projects.js');
var moment    = require('moment');
var jwt       = require('jsonwebtoken');
var randtoken = require('rand-token');
var Mailgun   = require('mailgun-js');
var helpers   = require('./helpers.js');

var port            				= process.env.PORT || 3000;
var APP_URL           			= process.env.APP_URL;
var MONGOLAB_URI           	= process.env.MONGOLAB_URI;
var MAILGUN_API           	= process.env.MAILGUN_API;
var MAILGUN_DOMAIN          = process.env.MAILGUN_DOMAIN;
var TOKEN_SECRET            = process.env.TOKEN_SECRET;

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

module.exports = function(app) {

app.post('/api/issue/create', function(req, res) {

    var issue = new Issues({
      title: req.body.title,
      description: req.body.description,
      fields: req.body.fields,
      attachments: req.body.attachments,
      project: req.body.project,
      created_by: req.user || req.body.created_by,
    });

    issue.save(function(err, result) {
      if (err) {
        return res.status(409).send({message: 'There was an error creating the issue: ' + err});
      }
      if (!result.number) {
        console.log('number = :(');
      }
      console.log(result);
      res.send({message: 'New issue created', result: result});
    });
  });

app.get('/api/issue', function(req, res) {
  Issues.findOne({project: req.query.project, number: req.query.number})
      .populate('project')
      .populate('created_by')
      .populate('fields')
      .exec(function(err, issue) {
        console.log('Issue focus');
     console.log(issue);
     if (err) {
       return res.status(409).send({message: 'There was an error retrieving the issue' + err});
     }
     res.send(issue);
   });
});

app.get('/api/issues', function(req, res) {
  Issues.find()
  .populate('project')
  .populate('created_by')
  //.populate('fields')
  .exec(function(err, issues) {
    if (err) {
      return res.status(409).send({message: 'There was an error retrieving issues' + err});
    }
    res.send(issues);
  });
});

};
