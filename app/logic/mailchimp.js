var MailChimpAPI = require('mailchimp').MailChimpAPI;

var config = require('./config')

var apiKey = config.mailchimp;

try { 
    var api = new MailChimpAPI(apiKey, { version : '1.3', secure : false });
} catch (error) {
    console.log(error.message);
}

module.exports = api