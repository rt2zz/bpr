var app = require('../../app.js')

var Product = require('../../logic/db/product.js')

//CREATE
app.get('/products/create', function(req, res){
  console.log('get')
  res.render('product.save.jade')
})

app.post('/products/create', function(req, res){
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

