var mediacb=function(req, res){
  console.log(req)
  res.render('test/media-upload')
}

var app = require('../app.js')
var fs = require('fs')

var pkgcloud = require('pkgcloud')

var amazon = pkgcloud.storage.createClient({
  provider: 'amazon',
  key: 'S9vQR5vw5jjo6zHMHlxq1YRdKxeN26guVhWxqRH4',
  keyId: 'AKIAIAWPYUBRRO7CKQ4Q'
});

//Testing
app.get('/media-upload',mediacb)

app.post('/media-upload', function(req, res){
  console.log('post media')
  console.log(req.body)
  console.log(req.files)
  console.log(req.files.media.path)

  fs.createReadStream(req.files.media.path).pipe(amazon.upload({
    container: 'bpr_media',
    remote: 'remote-file-name.txt'
  }, function(){
    console.log('done')
  }));

  res.redirect('/media-upload')
})



mediacb(5,2)