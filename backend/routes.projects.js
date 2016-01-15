var mongoose  = require('mongoose');
var Project   = require('./models/projects.js');
var auth      = require('./routes.auth.js');
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

module.exports = function(app) {

app.post('/api/project/create', function(req, res) {
  Project.findOne({prefix: req.body.prefix}, function(err, existingProject) {
    if (existingProject) {
      return res.status(401).send({ message: 'There is already a project with that name' });
    }
    var project = new Project({
      name: req.body.name,
      prefix: req.body.prefix,
      created_by: req.user || req.body.created_by,

    });
    project.save(function(err, result) {
      if (err) {
        return res.status(409).send({message: 'There was an error creating the project: ' + err});
      }
      res.send({message: 'New project created', result: result});
    });
  });
});

app.get('/api/projects', function(req, res) {
  Project.find({}, function(err, projects) {
    if (err) {
      return res.status(409).send({message: 'There was an error retrieving projects ' + err});
    }
    res.send(projects);
  });
});

app.get('/api/project/fields', function(req, res) {
  Project.find({prefix: req.query.prefix})
  .populate('fields')
  .exec(function(err, projects) {
    if (err) {
      return res.status(409).send({message: 'There was an error retrieving projects ' + err});
    }
    res.send(projects);
  });
});

};
