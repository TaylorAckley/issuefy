var mongoose  = require('mongoose');
var Org      = require('./models/orgs.js');
var moment    = require('moment');
var config    = require('../config');
var jwt       = require('jsonwebtoken');
var randtoken = require('rand-token');
var Mailgun   = require('mailgun-js');
var helpers   = require('./helpers.js');



module.exports = function(app) {


app.post('/org/create', function(req, res) {
  Org.findOne({name: req.body.name}, function(err, existingOrg) {
    if (existingOrg) {
      return res.status(401).send({ message: 'There is already a Organization with that name' });
    }
    var org = new Org({
      name: req.body.name,
      regkey: req.body.regkey,
    });
    org.save(function(err, result) {
      if (err) {
        return res.status(409).send({message: 'There was an error creating the organization: ' + err});
      }
      res.send({message: 'New organization created', result: result});
    });
  });
});

};
