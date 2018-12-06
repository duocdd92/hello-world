const sharp = require('sharp');
var fs = require("fs");
let base64 = require('./base64').base64.split(';base64,').pop();
let buff = new Buffer(base64, 'base64');
// console.log(fs.readFileSync('./src/sharp/origin.jpg'))
// sharp('origin.jpg')
//     .rotate()
//     .resize(200)
//     .toBuffer()
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err)
//     });
sharp(fs.readFileSync('./src/sharp/origin.jpg'))
    .resize(200, null)
    .toFile('./src/sharp/xx2.jpg', (err, info) => {
        console.log(err);
        // console.log(info)
    });

// sharp(buff)
//     .resize(100, 100)
//     .toBuffer((err, info) => {
//         console.log(err);
//         console.log(info)
//         fs.writeFile("out3.png", info, function(err) {
//             console.log(err);
//         });

//     })
    // var img = resizebase64(base64, 100, 100);
    // console.log(img)

// var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

// fs.writeFile("out.png", base64, 'base64', function(err) {
//     console.log(err);
// });

// fs.writeFile("out2.png", buff, function(err) {
//     console.log(err);
// });