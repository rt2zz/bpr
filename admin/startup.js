var fs = require('fs')

console.log('Removing tmp files...')
var files = fs.readdirSync(process.cwd()+'/public/tmp/')
console.log(files)

for (var i = 0; i < files.length; i++) {
  fs.unlink(process.cwd()+'/public/tmp/'+files[i], function (err) {
    if (err) console.log('Error unlinking '+files[i]+': ', err);
  });
}