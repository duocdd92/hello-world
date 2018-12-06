var sql = require('mssql');
var utils = require('../../../common/utils/utils.js');
var db = require('../../../common/database/database_connection.js');
var dataConfig = require('../../../common/config/data_config.js');
var services = require('../services/services.js');
var procedures = dataConfig.procedures;

//Get group id by line code
exports.getGroupByLineCode = function(lineCode, success, error) {
    let pool = db.getDBConnection();

    if (!pool) {
        error();
        return;
    }

    pool.request()
        .input('pRobotLineCode', lineCode)
        .execute(procedures.lineGroups)
        .then(function(recordset) {
            success({ groupId: recordsets[0][0].id, line_code: lineCode });
        }).catch(function(err) {
            utils.logToConsole(procedures.lineGroups + ' err ' + err);
            error();
        });
}

//Get group list
exports.getGroupsList = function(success, error) {
    let pool = db.getDBConnection();

    if (!pool) {
        error();
        return;
    }

    pool.request()
        .execute(procedures.lineGroups)
        .then(function(recordset) {
            success(recordset[0]);
        }).catch(function(err) {
            utils.logToConsole(procedures.lineGroups + ' err ' + err);
            error();
        });
}

//Get lines list by group id
exports.getLinesListByGroupId = function(groupId, success, error) {
    let pool = db.getDBConnection();

    if (!pool) {
        error();
        return;
    }

    pool.request()
        .input('pRobotLineGroupCode', groupId)
        .execute(procedures.linesList)
        .then(function(recordset) {
            success(recordset[0]);
        }).catch(function(err) {
            utils.logToConsole(procedures.linesList + ' err ' + err);
            error();
        });
}

//Get machine keeper photos
exports.getMkPhotos = function(lineCode, success, error) {
    let pool = db.getDBConnection();

    if (!pool) {
        error();
        return;
    }

    pool.request()
        .input('pRobotLIneCode', lineCode)
        .execute(procedures.mkPhotos)
        .then(function(recordset) {
            let data = recordsets[0];
            let rtData = [];

            for (let i in data) {
                var mk = {};
                mk.photo = data[i].mk_photo.toString('base64');
                mk.name = data[i].mk_name;
                rtData.push(mk);
            }

            success(rtData);
        }).catch(function(err) {
            utils.logToConsole(procedures.mkPhotos + ' err ' + err);
            error();
        });
}

//Get black box ip
exports.getBloxIp = function(lineCode, success, error) {
    let pool = db.getDBConnection();

    if (!pool) {
        error();
        return;
    }

    pool.request()
        .input('pRobotLIneCode', lineCode)
        .execute(procedures.blackBoxIp)
        .then(function(recordset) {
            success(recordsets[0][0]);
        }).catch(function(err) {
            utils.logToConsole(procedures.blackBoxIp + ' err ' + err);
            error();
        });
}

//Get report week
exports.getReportWeek = function(lineCode, success, error) {
    let pool = db.getDBConnection();

    if (!pool) {
        error();
        return;
    }

    pool.request()
        .execute(procedures.reportWeek)
        .then(function(recordset) {
            success(recordset);
        }).catch(function(err) {
            utils.logToConsole(procedures.reportWeek + ' err ' + err);
            error();
        });
}