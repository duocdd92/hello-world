const csv = require('csv');
const fs = require('fs');
const parser = csv.parse();
const assert = require('assert');

let myObj = [
    { year: 'XXXX', phone: 'XXX XXXX' },
    { year: 'YYYY', phone: 'YYY YYYY' }
];

// csv.stringify(myObj, { columns: ['year', 'phone'], header: true }, function(err, output) {
//     console.log(output)
//     fs.writeFile('name.csv', output, 'utf8', err => {
//         if (err) {
//             console.log('Some error occured - file either not saved or corrupted file saved.');
//         } else {
//             console.log('It\'s saved!');
//         }
//     });
// });

const records = []
parser.write('test');
parser.on('readable', function() {
    let record
    while (record = parser.read()) {
        records.push(record)
    }
})

parser.on('error', function(err) {
    console.error(err.message)
})

parser.on('end', function() {
    console.log(records);
});