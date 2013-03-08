var app = require('../app.js')
var config = require('../logic/config.js')
var request = require('request')
var User = require('../logic/db/user.js')
var mailchimp = require('../logic/mailchimp.js')

app.post('/subscribe', function(req, res){
  var email = req.body.email
  var user = {
    _id:email,
    email:email,
    fb:false,
    votes:{}
  }

  mailchimp.listSubscribe({id:'5a8c994b12',email_address:email,double_optin:false},function(error,data){})

  User.insert(user, {}, function(err){
    req.session.user = user
    res.redirect('/')
  })


})

app.post('/user/setup', function(req, res){
  console.log(req.body.fbResponse)
  var accessToken = req.body.fbResponse.authResponse.accessToken
  var userID = req.body.fbResponse.authResponse.userID
  request('https://graph.facebook.com/'+userID+'?&access_token='+accessToken, function(err, response, body){
    var fbUser = JSON.parse(body)
    var user = {
      _id:fbUser.email,
      email:fbUser.email,
      fb:fbUser,
      votes:{}
    }
    console.log('FB USER',user)
    User.findById(user._id, function(err, doc){
      console.log('DOC', doc)
      if(doc){
        user = doc
        user.fb = fbUser
        req.session.user = user
        User.update(user._id, {$set: {fb: fbUser}}, function(err, doc){
          console.log('update user', err)
        })
      }
      else{
        req.session.user = user
        User.save(user, function(){
          console.log('SAVE new USER')
        })
      }
      res.json(JSON.stringify(user))
    })
  })
})
