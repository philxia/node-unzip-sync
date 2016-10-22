var fs = require('fs');
var path = require('path');

var Fiber = require('fibers');


describe('Unzip-sync', function() {
  describe('#extract()', function() {
  	it('should success', function(done){
  		this.timeout(1500000);

  		Fiber(function() {
  			console.log('trying to extract the zip');
        var unzipSync = require('../index.js');

        console.log(unzipSync);

        var unzipSync = new unzipSync.UnzipSync({folderPath: __dirname});
        var result = unzipSync.extract(path.join(__dirname,'LICENSE.zip'));

	  		done();

  		}).run();

  	});
  });
});