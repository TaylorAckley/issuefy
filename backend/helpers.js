var Mailgun   = require('mailgun-js');
var moment    = require('moment');
var config    = require('../config');

module.exports = {

sendMail: function(data, callback) {
    var mailgun = new Mailgun({apiKey: config.MAILGUN_API, domain: config.MAILGUN_DOMAIN});
    mailgun.messages().send(data, function (err, body) {
        if (err)throw err;
        else {

            var result = body;
            return callback(null, result);
        }
      });

}
};
