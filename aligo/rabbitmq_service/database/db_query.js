var sql = require('mssql');
var utils = require('../../common/utils/utils.js');
var db = require('../../common/database/database_connection.js');
var dataConfig = require('../../common/config/data_config.js');
var services = require('../services/services.js');
var procedures = dataConfig.procedures;

//Get total lines
exports.getTotalLines = function(callbackSuccess, callbackError) {
    let pool = db.getDBConnection();

    if (!pool) {
        callbackError();
        return;
    }

    let startTime = new Date().getTime();
    utils.logToConsole('Start - ' + procedures.totalLines);
    pool.request()
        .execute(procedures.totalLines)
        .then(function(recordset) {
            services.saveTotalLinesToRedis(recordset);
            utils.logToConsole('End - ' + procedures.totalLines + (new Date().getTime() - startTime));
            callbackSuccess();
        }).catch(function(err) {
            utils.logToConsole(procedures.totalLines + ' err ' + err);
            callbackError();
        });
};

//Get kpi
exports.getKpi = function(callbackSuccess, callbackError) {
    let pool = db.getDBConnection();

    if (!pool) {
        callbackError();
        return;
    }

    let startTime = new Date().getTime();
    utils.logToConsole('Start - ' + procedures.kpi);

    pool.request()
        .execute(procedures.kpi)
        .then(function(recordset) {
            utils.logToConsole('End - ' + procedures.kpi + (new Date().getTime() - startTime));
            services.saveKpiToRedis(recordset[0][0]);
            callbackSuccess();
        }).catch(function(err) {
            utils.logToConsole(procedures.kpi + ' err ' + err);
            callbackError();
        });
};

//Get all lines data
exports.getAllLines = function(callbackSuccess, callbackError) {
    let pool = db.getDBConnection();

    if (!pool) {
        callbackError();
        return;
    }

    let startTime = new Date().getTime();
    utils.logToConsole('Start - ' + procedures.allLines);

    pool.request()
        .execute(procedures.allLines)
        .then(function(recordset) {
            services.saveAllLinesToRedis(recordset);
            utils.logToConsole('End - ' + procedures.allLines + (new Date().getTime() - startTime));
            callbackSuccess();
        }).catch(function(err) {
            utils.logToConsole(procedures.allLines + ' err ' + err);
            callbackError();
        });
};

//Robot status
exports.getAllLinesRobotStatus = function(callbackSuccess, callbackError) {
    let pool = db.getDBConnection();

    if (!pool) {
        callbackError();
        return;
    }

    let startTime = new Date().getTime();
    utils.logToConsole('Start - ' + procedures.robotStatus);

    pool.request()
        .execute(procedures.robotStatus)
        .then(function(recordset) {
            services.saveRobotMotionToRedis(recordset[0]);
            services.saveTraysToRedis(recordset[1]);
            services.saveRobotTransferToRedis(recordset[2]);
            callbackSuccess();
            // utils.logToConsole('End - ' + procedures.robotStatus + (new Date().getTime() - startTime));
        }).catch(function(err) {
            utils.logToConsole(procedures.robotStatus + ' err ' + err);
            callbackError();
        });
};

//CNC state
exports.getAllLinesCncState = function(callbackSuccess, callbackError) {
    let pool = db.getDBConnection();

    if (!pool) {
        callbackError();
        return;
    }

    let startTime = new Date().getTime();
    utils.logToConsole('Start - ' + procedures.cncState);

    pool.request()
        .execute(procedures.cncState)
        .then(function(recordset) {
            services.saveLinesCNCToRedis(recordset[0]);
            // utils.logToConsole('End - ' + procedures.cncState + (new Date().getTime() - startTime));
            callbackSuccess();
        }).catch(function(err) {
            utils.logToConsole(procedures.cncState + ' err ' + err);
            callbackError();
        });
};

//Get all lines config
exports.getAllLinesConfig = function(callbackSuccess, callbackError) {
    let pool = db.getDBConnection();

    if (!pool) {
        callbackError();
        return;
    }

    let startTime = new Date().getTime();
    utils.logToConsole('Start - ' + procedures.allLineConfig);

    pool.request()
        .execute(procedures.allLineConfig)
        .then(function(recordset) {
            services.saveAllLineConfigToRedis(recordset[0]);
            callbackSuccess();
        }).catch(function(err) {
            utils.logToConsole(procedures.allLineConfig + ' err ' + err);
            callbackError();
        });
};

//Get alarm list config
exports.getAlarmInfoConfig = function(callbackSuccess, callbackError) {
    let pool = db.getDBConnection();

    if (!pool) {
        callbackError();
        return;
    }

    let startTime = new Date().getTime();
    utils.logToConsole('Start - ' + procedures.alarmInfo);

    pool.request()
        .execute(procedures.alarmInfo)
        .then(function(recordset) {
            services.saveAlarmConfigToRedis(recordset[0]);
            callbackSuccess();
        }).catch(function(err) {
            utils.logToConsole(procedures.alarmInfo + ' err ' + err);
            callbackError();
        });
};