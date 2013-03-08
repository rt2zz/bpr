function requireRoute(name){
	require('./routes/'+name+'.js')
}

requireRoute('home')
requireRoute('user')
requireRoute('product')