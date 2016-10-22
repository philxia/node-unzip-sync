var fs = require('fs');
var path = require('path');

var Fiber = require('fibers');
var unzip = require('unzip');


function sync(obj, fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var result;
    var fiber;
    args.push(function(error, value) {
      result = error || value;
      if (fiber) {
        fiber.run(result);
      } else {
        fiber = true;
      }
    });
    var o = this[obj];
    o[fn].apply(o, args);
    if (!fiber) {
      fiber = Fiber.current;
      Fiber.yield();
    }
    if (result instanceof Error) {
      throw new Error(result.stack + '\nFollowed by:');
    }
    return result;
  };
}


unzip.Extract.prototype.extract = function (filePath, onClose) {
  fs.createReadStream(filePath).pipe(this);
  this.on('close',onClose);
};

function UnzipSync(options) {
  this._unzip = new unzip.Extract({ path: options.folderPath });
  this._filePath = options.filePath;
};


[
  'extract'
].forEach(function(name) {
  UnzipSync.prototype[name] = sync('_unzip', name);
});


exports.UnzipSync = UnzipSync;