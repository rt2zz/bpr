var app = require('../app.js')
var Product = require('../logic/db/product.js')

app.get('/', function(req, res){
  Product.find({status: "2"}).toArray(function(err, products){
    res.locals.products = products
    res.render('home')
  })
})