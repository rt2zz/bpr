var mongo = require('mongoskin')
var creds = require('../config.js').productdb

var db = mongo.db(creds.user+':'+creds.pass+'@'+creds.uri)
db.bind('product', {
  initialize: function(data){
    return {
      created: new Date().getTime(),
      name: data.name,
      desc: data.desc
    }
  },
  validate: function(product){
    //@TODO improve validation & error handling
    if(product.name.length == 0){
      throw new Error('No Proudct Name')
    }
    return true
  }
})


module.exports = db.product