/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var FileStreamRotator = require('file-stream-rotator');
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var ip = require('ip');
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main',
        helpers: {
            section: function(name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });
var app = express();
var http = require('http').Server(app);
var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use('/handlers', express.static(__dirname + "/handlers"));
app.use('/modules', express.static(__dirname + "/modules"));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set("port", process.env.PORT || 3000);
app.set('env', 'production'); // production or development
switch (app.get('env')) {
    case 'development':
        app.use(morgan('combined'));
        break;
    case 'production':
        var logDirectory = path.join(__dirname, 'log');
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
        var accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: path.join(logDirectory, 'access-%DATE%.log'),
            frequency: 'daily',
            verbose: false
        });
        app.use(morgan('combined', { stream: accessLogStream }));
        break;
};
midSocket = [];
require('./modules/routes/routes.js')(app);
app.use(function(req, res, next) {
    res.status(404);
    res.send('404');
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('505');
});
http.listen(app.get("port"), function() {
    console.log((new Date()) + " Express started in " + app.get('env') +
        " mode on " + ip.address() + ":" + app.get("port") +
        " ; press Ctrl-C terminate.");
});