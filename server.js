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
var config          = require('./config'); // get our config file
var helpers         = require('./backend/helpers.js'); // get our helpers file
var app             = express();

//env vars
var port            = process.env.PORT || 3000;

//boring logging and parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.set('secret', config.secret);

//mongodb

	mongoose.connect(config.MONGOLAB_URI);

mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
  });

//authentication

console.log();


//routes

routes = require('./backend/routes.auth.js')(app);
routes = require('./backend/routes.org.js')(app);

  app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  res.setHeader('Last-Modified', (new Date()).toUTCString());

});

// go go inspector gadget
app.listen(port);
console.log('App listening on port ' + port);
