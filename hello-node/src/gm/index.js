var fs = require('fs'),
    gm = require('gm').subClass({ imageMagick: true });
// gm = require('gm');
gm('/origin.jpg')
    .resize(240, 240)
    .noProfile()
    .write('/resize.jpg', function(err, rs) {
        console.log('error', err);
        console.log('result', rs);
    });