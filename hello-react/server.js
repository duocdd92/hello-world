var express = require('express')
var app = express()
const port = 3000

app.use('/public', express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function() {
    console.log('server is listening on port ' + port);
});