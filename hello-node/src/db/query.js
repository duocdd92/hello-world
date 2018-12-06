const dbConn = require('./connection.js');

exports.getUsers = function(successCb, errorCb) {
    dbConn.getDBConnPool(pool => {
        pool.request()
            .query('SELECT * FROM [user]', (err, records) => {
                if (err) {
                    errorCb(err);
                } else {
                    successCb(records.recordset);
                }
            })
    }, errorCb);
}