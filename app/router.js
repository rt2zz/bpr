function requireRoute(name){
	require('./routes/'+name+'.js')
}

requireRoute('home')
requireRoute('email')
requireRoute('user')