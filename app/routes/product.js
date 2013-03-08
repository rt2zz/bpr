var app = require('../app.js')
var config = require('../logic/config.js')
var User = require('../logic/db/user.js')
var Product = require('../logic/db/product.js')

app.post('/product/vote/:dir/:pid', function(req, res){
  var dir = req.params.dir
  var val = dir == 'up' ? 1 : -1
  var pid = req.params.pid

  console.log('dir', dir)
  console.log('val', val)

  if(typeof req.session.user != 'undefined'){
    req.session.user.votes[pid] = val
    console.log(req.session.user)
    User.save(req.session.user, {}, function(err, doc){
      console.log('save err', err)
      console.log('save doc', doc)
    })
  }

  function vote(){
    var votekey = "votes."+dir
    console.log('vkey',votekey)
    Product.update({_id: req.params.pid}, {$inc: {votekey : val}}, function(err, p){
      console.log('updating')
      console.log(err)
      console.log(p)
      res.send('hi')
    })
  }

  if(typeof req.session.user == 'undefined'){
    vote()
  }
  else{

    console.log('Existing val', req.session.user.votes.pid)
    if(req.session.user.votes.pid != val){
      console.log('VOTE that Diff')
      vote()
    } 
  }


})

