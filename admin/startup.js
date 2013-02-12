var fs = require('fs')

var files = fs.readdirSync(__dirname+'/public/tmp/')

for (var i = 0; i < files.length; i++) {
  fs.unlink(__dirname+'/public/tmp/'+files[i], function (err) {
    if (err) console.log('Error unlinking '+files[i]+': ', err);
  });
}