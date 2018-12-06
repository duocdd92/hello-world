console.log('Connecting to database...');

var sql = require('mssql');
var utils = require('../utils/utils.js');
var staticData = require('../config/data_config.js');
var dbConfig = staticData.databaseConfig;

var isConnected = false;
var pool = null;

function connectToDB() {
    if (isConnected) return;

    sql.connect(dbConfig)
        .then(function(p) {
            pool = p;
            isConnected = true;
            console.log('Connected to database');
        })
        .catch(function(err) {
            console.log('Connect to database failed, retry...');
            pool = null;
            setTimeout(connectToDB, 1000);
        });
}

sql.on('error', function(err) {
    console.log('Sql error ' + err);
})

connectToDB();

exports.getDBConnection = function() {
    if (isConnected) return pool;
    return null;
}