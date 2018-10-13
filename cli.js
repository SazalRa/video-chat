var fs = require('fs');
var Path = require('path');

const path = Path.resolve(__dirname+'/assets/song.mp4');
var readStream = fs.createReadStream(path);
readStream.pipe(process.stdout);