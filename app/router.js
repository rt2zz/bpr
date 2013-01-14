function requireRoute(name){
	require('./routes/'+name+'.js')
}

requireRoute('listing')
requireRoute('about')
