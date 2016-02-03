var mongoose  = require('mongoose');
var Tag       = require('./models/model.tags.js');
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

app.post('/api/tag/create', function(req, res) {
  Tag.findOne({name: req.body.name}, function(err, existingTag) {
    if (existingTag) {
      return res.status(401).send({ message: 'There is already a tag with that name' });
    }
    var tag = new Tag({
      name: req.body.name,
      expiration: req.body.expiration,
      description: req.body.description,
      created_by: req.user || req.body.created_by,

    });
    tag.save(function(err, result) {
      if (err) {
        return res.status(409).send({message: 'There was an error creating the tag: ' + err});
      }
      res.send({message: 'New tag created', result: result});
    });
  });
});

app.get('/api/tags', function(req, res) {
  Tag.find({}, function(err, tags) {
    if (err) {
      return res.status(409).send({message: 'There was an error retrieving tags ' + err});
    }
    res.send(tags);
  });
});

app.get('/api/tags/autocomplete', function(req, res) {
  Tag.find({}).select('name').exec(function(err, tags) {
    if (err) {
      return res.status(409).send({message: 'There was an error retrieving tags ' + err});
    }
    res.send(tags);
  });
});

};
