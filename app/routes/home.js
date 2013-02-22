var app = require('../app.js')
var Product = require('../logic/db/product.js')

app.get('/', function(req, res){
  Product.find({status: "2"}, {limit:4}).toArray(function(err, products){
    res.locals.products = products
    res.render('home')
  })
})

app.get('/api/1/products', function(req, res){
  var skip = req.query.skip
  var limit = req.query.limit
  console.log(req.query)
  Product.find({status: "2"}, {limit:limit, skip:skip}).toArray(function(err, products){
    res.json(products)
  })
})