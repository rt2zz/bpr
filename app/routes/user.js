var app = require('../app.js')
var config = require('../logic/config.js')
var request = require('request')
var User = require('../logic/db/user.js')

app.post('/user/setup', function(req, res){
  console.log(req.body.fbResponse)
  var accessToken = req.body.fbResponse.authResponse.accessToken
  var userID = req.body.fbResponse.authResponse.userID
  request('https://graph.facebook.com/'+userID+'?&access_token='+accessToken, function(err, response, body){
    console.log(body)
    console.log(err)
    var fbUser = JSON.parse(body)
    var user = {
      _id:fbUser.email,
      email:fbUser.email,
      fb:fbUser
    }
    User.save(user,{upsert:true},function(err, doc){
      console.log('err', err)
      console.log(doc)
    })
  })
  res.send('hi')
})
