const JSONStream = require('JSONStream');
let obj = { a: 'a', b: { b: 'b' } };

var stream = JSONStream.stringify

stream.on('data', function(data) {
    console.log(data)
})