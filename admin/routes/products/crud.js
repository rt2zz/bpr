var app = require('../../app.js')
var _ = require('lodash')
var imageUpload = require('../../logic/imageUploader.js');

var Product = require('../../logic/db/product.js')

//CREATE
app.get('/products/create', function(req, res){
  var product = Product.new()
  res.locals.isNew = 1
  res.locals.product = product
  res.render('product.save.jade')
})

app.post('/products/update', function(req, res){
  var product = req.body
  var valid = Product.validate(product)
  var media = JSON.parse(req.body.media);
  console.log('update')

  isNew = req.body.isNew
  delete req.body.isNew
  
  //process each media item
  _(media).forEach(function(item, i){
    console.log('MEDIA PROCESS:');
    console.log(i);

    //if it is an image and it is new upload it to AWS
    if(item.type == 'image' && item.new == true){
      console.log('handle image');
      imageUpload(item.name, item.uri, product._id, function(data, d12){console.log('aws complete')})
      delete media[i].new
      media[i].uri = media[i].path = 's3.amazonaws.com/bpr_media/'+product._id+'/'+item.name
      console.log('mediaI')
      console.log(media[i])
    }
  })
  product.media = media

  if(valid){
    var cb = function(err){
      res.redirect('/product/'+product._id+'/update')
    }
    console.log('valid')
    if(isNew==1) Product.insert(product, cb)
    else{
      console.log('else') 
      Product.update({_id:product._id}, product, {strict: true}, cb) 
    }
  }
})

//READ
app.get('/product/:id', function(req, res){
  res.render('')  
})

//UPDATE
app.get('/product/:id/update', function(req, res){
  Product.findById(req.params.id, function(err, product){
    res.locals.product = product
    console.log('MEDIA:', product.media)
    res.render('product.save.jade')
  })
})

app.post('/product/:id/update', function(req, res){

})

//DELETE
app.get('/product/:id/delete', function(req, res){
  console.log('delete get')
  res.send('hi')
})

app.post('/product/:id/delete', function(req, res){
  console.log('DELETE THIS '+req.params.pid)
  var pid = req.params.id
  Product.update({_id:pid}, {$set: {status:0}}, {}, function(err, response){
    console.log(err);
    console.log('RESPONSE',response);
    res.send({
      status: 'success'
    })
  });
})

app.get('/products', function(req, res){
  Product.find({status: {$ne: 0}}).toArray(function(err, products){
    res.locals.products = products
    res.render('product.listing.jade')
  })
})

app.get('/products/trash', function(req, res){
  Product.find({$or: [{status: 0}, {status: {$exists: false}}]}).toArray(function(err, products){
    res.locals.products = products
    res.render('product.trash.jade')
  })
})

app.post('/products/purge', function(req, res){
  var pids = req.body.pids
  Product.remove({_id: {$in: pids}}, {}, function(err, response){
    console.log(err)
    console.log('RES', response)
    res.send('deleted')
  })
});

