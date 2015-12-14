var Mailgun   = require('mailgun-js');
var moment    = require('moment');

//env vars
var port            				= process.env.PORT || 3000;
var APP_URL           			= process.env.APP_URL;
var MONGOLAB_URI           	= process.env.MONGOLAB_URI;
var MAILGUN_API           	= process.env.MAILGUN_API;
var MAILGUN_DOMAIN          = process.env.MAILGUN_DOMAIN;
var TOKEN_SECRET            = process.env.TOKEN_SECRET;

module.exports = function(app) {

function sendMail(data, callback) {
    var mailgun = new Mailgun({apiKey: MAILGUN_API, domain: MAILGUN_DOMAIN});
    mailgun.messages().send(data, function (err, body) {
        if (err)throw err;
        else {

            var result = body;
            return callback(null, result);
        }
      });

}
};
