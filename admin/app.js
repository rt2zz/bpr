
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , fs = require('fs');

var app = express();

var config = require('./logic/config.js')

app.configure(function(){
  app.set('port', process.env.PORT || 4000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser( {uploadDir:'./public/tmp/'}  ))
  app.use(express.methodOverride())
  app.use(express.cookieParser('bp secret so safe'))
  app.use(express.session())
  app.use(defaults)
  app.use(app.router)
  app.use(require('stylus').middleware(__dirname + '/public'))
  app.use(express.static(path.join(__dirname, 'public')))
});

//Setup conveinance defaults
function defaults(req, res, next){
  res.locals.protocol = req.protocol
  next()
}

app.configure('development', function(){
  app.use(express.errorHandler())
});

module.exports = app

require('./startup.js')
require('./router.js')

sslOpts = {
  key  : fs.readFileSync(config.ssl.path+'privatekey.pem'),
  ca   : fs.readFileSync(config.ssl.path+'certrequest.csr'),
  cert : fs.readFileSync(config.ssl.path+'certificate.pem')
}

https.createServer(sslOpts, app).listen(app.get('port'), function(){
  console.log("BP Admin Listenting over HTTPS on Port: " + app.get('port'))
});
