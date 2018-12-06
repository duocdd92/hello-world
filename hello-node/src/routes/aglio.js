const aglio = require('aglio');
const express = require('express');
var fs = require('fs');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var blueprint = __dirname + '/../data/api.apib';

    var options = {
        themeVariables: 'default'
    };

    fs.readFile(blueprint, function(error, data) {
        if (error) {
            return res.json(error);
        }

        aglio.render(data.toString(), options, function(err, html, warnings) {
            if (err) return console.log('error: \n', err);
            // if (warnings) console.log('warnings: \n', warnings);ds

            res.send(html)
        });
    });
});

module.exports = router;