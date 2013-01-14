var app = require('../app.js')
var fs = require('fs')

var pkgcloud = require('pkgcloud')

var amazon = pkgcloud.storage.createClient({
  provider: 'amazon',
  key: 'S9vQR5vw5jjo6zHMHlxq1YRdKxeN26guVhWxqRH4',
  keyId: 'AKIAIAWPYUBRRO7CKQ4Q'
});

// amazon.getFiles('bpr_media', function (err, files) {
//  console.log(err)
//  console.log(files)
// })

//Testing
app.get('/media-upload', function(req, res){
  res.render('test/media-upload')
})

app.post('/media-upload', function(req, res){
  console.log('piost media')
  console.log(req.body)
  console.log(req.files)
  console.log(req.files.media.path)

  fs.createReadStream(req.files.media.path).pipe(amazon.upload({
    container: 'bpr_media',
    remote: 'remote-file-name.txt'
  }, function(){
    console.log('testcb')
  }));

  res.redirect('/media-upload')
})