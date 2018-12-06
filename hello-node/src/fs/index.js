const fs = require('fs');

// fs.writeFile('mynewfile3.json', '{ "a": "a" }', function(err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

let data = fs.writeFileSync('mynewfile3.json', '{ "a": "a" }', function(err, data) {
    if (err) throw err;
    console.log(data);
})