const express = require('express')
const app = express()

app.post('/media/profile', function(req, res) {
    console.log(req.body)
    console.log(req.files)
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))