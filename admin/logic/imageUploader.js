var fs = require('fs')
var config = require('./config.js')
var pkgcloud = require('pkgcloud')
var amazon = pkgcloud.storage.createClient({
  provider: 'amazon',
  key: config.s3.key,
  keyId: config.s3.keyId
});

module.exports = function(name, srcPath, rmtDir, cb){
  fs.createReadStream(srcPath).pipe(amazon.upload({
      container: 'bpr_media',
      remote: rmtDir+'/'+name
    }, function(a, b){
      console.log('returned maz')
      cb();
  }));
}