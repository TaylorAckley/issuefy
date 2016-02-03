var mongoose  = require('mongoose');
var Org       = require('./models/model.orgs.js');
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

app.post('/API/org/create', function(req, res) {
  Org.findOne({name: req.body.name}, function(err, existingOrg) {
    if (existingOrg) {
      return res.status(401).send({ message: 'There is already a organization with that name' });
    }
    var org = new Org({
      name: req.body.name,
      regkey: req.body.regkey,
      createdby: req.user,
    });
    org.save(function(err, result) {
      if (err) {
        return res.status(409).send({message: 'There was an error creating the organization: ' + err});
      }
      res.send({message: 'New organization created', result: result});
    });
  });
});
app.get('/api/orgs', function(req, res) {
  Org.find({}, function(err, orgs) {
    if (err) {
      return res.status(409).send({message: 'There was an error retrieving organizations ' + err});
    }
    res.send(orgs);
  });
});
};
