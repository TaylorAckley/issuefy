
var mongoose  = require('mongoose');
var Field   = require('./models/model.fields.js');
var auth   = require('./routes.auth.js');
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

app.post('/API/field/create', function(req, res) {
  Field.findOne({name: req.body.name}, function(err, existingField) {
    if (existingField) {
      return res.status(401).send({ message: 'There is already a field with that name' });
    }
    var field = new Field({
      name: req.body.name,
      type: req.body.type,
      values: req.body.values,
      created_by: req.user || req.body.created_by,

    });
    field.save(function(err, result) {
      if (err) {
        return res.status(409).send({message: 'There was an error creating the field: ' + err});
      }
      res.send({message: 'New field created', result: result});
    });
  });
});

app.get('/api/fields', function(req, res) {
  Field.find({}, function(err, fields) {
    if (err) {
      return res.status(409).send({message: 'There was an error retrieving fields ' + err});
    }
    res.send(fields);
  });
});

};
