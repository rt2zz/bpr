var app = require('../app.js')

var mailchimp = require('../logic/mailchimp.js')

app.post('/subscribe', function(req, res){
  var email = req.body.email
  mailchimp.listSubscribe({id:'5a8c994b12',email_address:email,double_optin:false},function(error,data){
    console.log(error)
    console.log(data)
    res.redirect('/')
  })
  })

