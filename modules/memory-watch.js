var heapdump = require('heapdump');
module.exports = function memoryWatch (moduleOptions) {
    heapdump.writeSnapshot(function(err, filename) {
        console.log('dump written to', filename);
    });
}