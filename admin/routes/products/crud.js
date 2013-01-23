var app = require('../../app.js')

var Product = require('../../logic/db/product.js')

//CREATE
app.get('/products/create', function(req, res){
  console.log('get')
  res.render('product.save.jade')
})

app.post('/products/update', function(req, res){
  console.log(req.body)
  if(req.body._id){

  }
  else{
    var product = Product.initialize(req.body);
    var test = Product.validate(product);
    console.log(test);
    res.redirect('/products/create')
  }
})

//READ
app.get('/product/:id', function(req, res){
  res.render('')  
})

//UPDATE
app.get('/product/:id/update', function(req, res){
  
})

app.post('/product/:id/update', function(req, res){

})

//DELETE
app.get('/product/:id/delete', function(req, res){
  
})

app.delete('/product/:id/delete', function(req, res){

})

