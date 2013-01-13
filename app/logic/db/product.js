var mongo = require('mongoskin')
var creds = require('../config.js').productdb

var db = mongo.db(creds.user+':'+creds.pass+'@'+creds.uri)
db.bind('product')
module.exports = db.product