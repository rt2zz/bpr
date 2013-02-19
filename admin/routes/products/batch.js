var app = require('../../app.js')
var Product = require('../../logic/db/product.js')
app.get('/batch/removemoney', function(req, res){
  Product.find().toArray(function(err, products){
    products.forEach(function(product, i){
      product.price.base = product.price.base.replace("$", '')
      Product.save(product, function(err, p){
        console.log('saved', product._id)
      })
    })
  });
})