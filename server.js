// requirements
var express         = require('express');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var path            = require('path');
var colors          = require('colors');
var cors            = require('cors');
var async           = require('async');
var bcrypt          = require('bcryptjs');
var moment          = require('moment');
var request         = require('request');
var qs              = require('querystring');
var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app             = express();

// global modules

var helpers         = require('./backend/helpers.js');

//env vars

var port            				= process.env.PORT || 3000;
var APP_URL           			= process.env.APP_URL;
var MONGOLAB_URI           	= process.env.MONGOLAB_URI;
var MAILGUN_API           	= process.env.MAILGUN_API;
var MAILGUN_DOMAIN          = process.env.MAILGUN_DOMAIN;
var TOKEN_SECRET            = process.env.TOKEN_SECRET;

//boring logging and parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

//mongodb

	mongoose.connect(MONGOLAB_URI);

mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
  });

//authentication

//routes

var auth 			= require('./backend/routes.auth.js')(app);
var org 			= require('./backend/routes.orgs.js')(app);
var project 	= require('./backend/routes.projects.js')(app);
var issue 		= require('./backend/routes.issues.js')(app);
var tag 			= require('./backend/routes.tags.js')(app);
var field 		= require('./backend/routes.fields.js')(app);

  app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  res.setHeader('Last-Modified', (new Date()).toUTCString());

});

// go go inspector gadget
app.listen(port);
console.log('App listening on port ' + port);
