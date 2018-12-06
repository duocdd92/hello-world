const mssql = require('mssql');

const dbConfig = require('../configuration/db.js').dbConfig;

var dbConnection = {
    sqlConnPool: null,
    isConnecting: false,

    connect: function(successCb, errorCb) {
        console.log('Starting connect to DB... \n');
        this.isConnecting = true;
        this.sqlConnPool = new mssql.ConnectionPool(dbConfig, err => {
            this.isConnecting = false;
            if (err) {
                console.error('getDBConnection error \n', err);
                errorCb && errorCb(err);
                setTimeout(this.connect, 1000);
            } else {
                console.log(`Successfully connected to server ${dbConfig.server}, database ${dbConfig.database} \n`);
                successCb && successCb(this.sqlConnPool);
            }
        });

        this.sqlConnPool.on('error', err => {
            console.error('DB connection error \n', err);
        });
    },

    getDBConnection: function(successCb, errorCb) {
        if (this.sqlConnPool) {
            successCb();
            return;
        }

        if (this.isConnecting) {
            console.log('DB is being connected, please wait! \n');
            errorCb('DB is being connected, please wait!');
            return;
        }

        connect(successCb, errorCb);
    }
}

exports.getDBConnPool = (successCb, errorCb) => {
    if (dbConnection.sqlConnPool) {
        successCb(dbConnection.sqlConnPool);
        return;
    }

    dbConnection.connect(successCb, errorCb);
};