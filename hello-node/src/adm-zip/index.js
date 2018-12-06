const AdmZip = require('adm-zip');
const fs = require('fs');

let obj = { a: 'a', b: { b: 'b' } };
fs.writeFile('xxx.json', JSON.stringify(obj), (err, result) => {
    console.log(err, result)
});

const zip = new AdmZip();
zip.toBuffer()
zip.addFile()