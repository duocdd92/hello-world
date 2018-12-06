const PDF = require('pdfkit');
const fs = require('fs');
const blobStream = require('blob-stream')
const { Base64Encode } = require('base64-stream');
const aws = require('aws-sdk');
const s3 = new aws.S3({
    "accessKeyId": "",
    "secretAccessKey": "",
    "signatureVersion": "v4"
});
const S3_BUCKET_MEDIA = 'media.crewlounge.center';


function upload(data) {
    let params = {
        'Key': `test/users/100017/invoice/test.pdf`,
        'Body': data,
        'ContentType': 'application/pdf',
        Bucket: S3_BUCKET_MEDIA,
        ACL: 'public-read'
    };
    s3.upload(params, function(err, data) {
        process.exit();
    });
};

var finalString = '';
const doc = new PDF();
const stream = doc.pipe(new Base64Encode());

doc.image('xx.jpg', 50, 40);

doc.font('Helvetica-Bold', 11)
    .fillColor('#00457D')
    .text('MCC bvba', 400, 40)
    .fillColor('#558EBF')
    .font('Helvetica')
    .text('Stapstraat 60', 400, 55)
    .text('3540 Herk-de-Stad', 400, 70)
    .text('Belgium', 400, 85)
    .font('Helvetica-Bold')
    .fillColor('#00457D')
    .text('VAT BE0479.735.630', 400, 100)
    .font('Helvetica-Bold', 15)
    .fillColor('black')
    .text('RECEIPT', 440, 200);

doc.moveTo(360, 220)
    .lineTo(505, 220)
    .stroke();

doc.font('Helvetica', 11)
    .fillColor('grey')
    .text('December 30, 2018', 306, 230, {
        width: 200,
        align: 'right'
    })

doc.text('Account ID:', 50, 230)
    .text('Account Email:', 50, 245)
    .text('Account Name:', 50, 260)
    .font('Helvetica-Bold')
    .fillColor('black')
    .text('12345', 134, 230)
    .text('duyduoc.haui@gmail.com', 134, 245)
    .text('Dang Duy Duoc', 134, 260)

doc.moveTo(50, 350)
    .strokeColor('#558EBF')
    .lineTo(550, 350)
    .stroke();

doc.fillColor('black')
    .fontSize(15)
    .text('Service', 50, 365)
    .text('Plan Upgrade', 270, 365)

doc.moveTo(50, 390)
    .lineTo(550, 390)
    .stroke();

doc.font('Helvetica-Bold', 11)
    .fillColor('grey')
    .text('CrewLounge PILOTLOG', 50, 405)
    .font('Helvetica')
    .text('From:', 270, 405)
    .text('PRO - Profession Edition', 330, 405)
    .text('Valid 999 days - until December 30, 2018', 330, 420)

doc.moveTo(50, 445)
    .lineTo(550, 445)
    .stroke();

doc.fillColor('grey')
    .text('New Plan:', 270, 460)
    .text('PRO - Profession Edition', 330, 460)
    .text('Valid 999 days - until December 30, 2018', 330, 475)

doc.moveTo(50, 495)
    .lineTo(550, 495)
    .stroke();

doc.rect(270, 505, 280, 30)
    .fill('#f7c637')

doc.font('Helvetica-Bold', 11)
    .fillColor('black')
    .text('Total to pay', 285, 515)
    .text('0.00 EUR', 450, 515)

doc.font('Helvetica', 11)
    .fillColor('#558EBF')
    .text('Thank you for choosing', 195, 685)
    .font('Helvetica-Bold', 11)
    .text('CrewLounge AERO', 315, 685)
    .font('Helvetica', 11)
    .text('Any question ? Contact support@crewlounge.aero', 180, 705)

doc.end()

stream.on('data', function(chunk) {
    finalString += chunk;
});

stream.on('end', function() {
    upload(new Buffer(finalString, 'base64'))
});