var app = require('../app.js')
var fs = require('fs')

var pkgcloud = require('pkgcloud')

var amazon = pkgcloud.storage.createClient({
  provider: 'amazon',
  key: 'S9vQR5vw5jjo6zHMHlxq1YRdKxeN26guVhWxqRH4',
  keyId: 'AKIAIAWPYUBRRO7CKQ4Q'
});

//Testing
// app.get('/media-upload',mediacb)

// app.post('/media-upload', function(req, res){
//   console.log('post media')
//   console.log(req.body)
//   console.log(req.files)
//   console.log(req.files.file.path)

//   fs.createReadStream(req.files.file.path).pipe(amazon.upload({
//     container: 'bpr_media',
//     remote: 'remote-file-name.txt'
//   }, function(){
//     console.log('done')
//   }));

//   res.redirect('/media-upload')
// })

// app.post('/uploadold', function(req, res){
//   console.log('try upload')
  // console.log(req.files.file.path+req.files.file.name)
  // fs.createReadStream(req.files.file.path).pipe(amazon.upload({
  //   container: 'bpr_media',
  //   remote: 'abc/'+req.files.file.name
  // }, function(a, b){
  //   console.log('returned maz')
  //   res.send('')
  // }));
// })

app.post('/upload', function(req, res){
  console.log('Uploading : '+req.files.file.name)
  console.log(req.files.file.name.replace(' ','-'));
  console.log(req.files.file.name.replace(/\s/g, ''))
  res.send({
    type: 'image',
    path: req.files.file.path.substring(6),
    name: req.files.file.name.replace(/\s/g,'-'),
    uri: req.files.file.path,
    new: true
  })
})


