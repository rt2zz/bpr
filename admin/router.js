function requireRoute(name){
  require('./routes/'+name+'.js')
}

requireRoute('products/crud')
requireRoute('media')