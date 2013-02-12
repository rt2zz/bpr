function requireRoute(name){
	require('./routes/'+name+'.js')
}

requireRoute('home')
