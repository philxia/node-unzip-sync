# node-unzip-sync

base on the node-unzip and filbers.

## Quick Examples

### Extract to a directory
  		Fiber(function() {
  			console.log('trying to extract the zip');
        var unzipSync = require('unzip-sync');

        var unzipSync = new unzipSync.UnzipSync({folderPath: __dirname});
        var result = unzipSync.extract(path.join(__dirname,'LICENSE.zip'));

	  		done();

  		}).run();
