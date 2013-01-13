var app = require('../app.js')

app.get('/about', function(req, res){
	res.render('about')
})