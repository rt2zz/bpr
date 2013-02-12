var mongo = require('mongoskin')
var creds = require('../config.js').productdb
var _ = require('lodash')

var db = mongo.db(creds.user+':'+creds.pass+'@'+creds.uri, {w: 1})
db.bind('product', {
  new: function(init){
    if(typeof init === 'undefined') var init = {}
    var data = _.defaults(init, {created: new Date().getTime(), name: '', desc: ''})
    console.log(data)
    var _id = (data.created+Math.floor((Math.random()*999)+100)).toString(16);
    console.log(_id)
    return {
      _id: _id,
      status: 2,
      created: data.created,
      name: data.name,
      desc: data.desc,
      media: []
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