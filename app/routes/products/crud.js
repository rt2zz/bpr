var app = require('../../app.js')

var Product = require('../../logic/db/product.js')
console.log(Product.toString())


//CREATE
app.get('/admin/products/create', function(req, res){
  console.log('get')
  res.render('admin/product.save.jade')
})

app.post('/admin/products/create', function(req, res){
})

//READ
app.get('/admin/product/:id', function(req, res){
	res.render('')	
})

//UPDATE
app.get('/admin/product/:id/update', function(req, res){
	
})

app.post('/admin/product/:id/update', function(req, res){

})

//DELETE
app.get('/admin/product/:id/delete', function(req, res){
	
})

app.delete('/admin/product/:id/delete', function(req, res){

})

