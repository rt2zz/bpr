var app = require('../app.js')

app.get('/', function(req, res){
	res.render('listing')
})