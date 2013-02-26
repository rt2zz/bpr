var mongo = require('mongoskin')
var creds = require('../config.js').bprdb

var db = mongo.db(creds.user+':'+creds.pass+'@'+creds.uri)
db.bind('user')
module.exports = db.user