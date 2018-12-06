var utils = require('../../common/utils/utils.js');
var redis = require('../../common/redis.js');
var commonConfig = require('../../common/config/data_config.js');
var lineData = commonConfig.lineData;
var redisKeys = commonConfig.redisKeys;

exports.saveAllLinesToRedis = function(sqlData) {
    let alarmList = {};
    // let newJobDate = isNewJobBeginDateTime();
    // if (!lineData.isAllLinesConfigSet) newJobDate = false;

    saveLinesCodeList(sqlData[0]);
    redis.sqlTableToRedis(sqlData[1], redisKeys.lineSummary.keyName, redisKeys.lineSummary.keyFields);
    redis.sqlTableToRedis(sqlData[2], redisKeys.lineRobotTransfer.keyName, redisKeys.lineRobotTransfer.keyFields);
    redis.sqlTableToRedis(sqlData[3], redisKeys.lineMotion.keyName, redisKeys.lineMotion.keyFields);
    saveLinesCNCToRedis(sqlData[4]);
    setAlarmList(sqlData[5], alarmList, 'alarmList');
    setAlarmList(sqlData[6], alarmList, 'alarmMsgList');

    saveAlarmListToRedis(alarmList);
}

function saveLinesCodeList(data) {
    redis.setValue(redisKeys.lineCodeList, JSON.stringify(data), function() {}, function(err) {
        utils.logToConsole('saveAllLinesToRedis save line code err ' + err);
    })
}

function saveLinesCNCToRedis(sqlData) {
    let lines = {};

    for (let i in sqlData) {
        let row = sqlData[i];
        let lineCode = row.ID;
        if (lines[lineCode] == undefined) lines[lineCode] = [];
        lines[lineCode].push(row);
    }

    redis.objectToRedis(lines, redisKeys.lineCnc);
}

function isNewJobBeginDateTime() {
    let currDateTime = new Date();
    let jobBGDT = utils.getJobDateInfo(currDateTime).jobStartDateTime;

    if (!lineData.jobBeginDateTime) {
        lineData.jobBeginDateTime = jobBGDT;
        return true;
    }

    if (new Date(jobBGDT) > new Date(lineData.jobBeginDateTime)) {
        lineData.jobBeginDateTime = jobBGDT;
        return true;
    }

    return false;
}

function setAlarmList(data, alarmList, prop) {
    for (let i in data) {
        let alarm = data[i];

        if (alarmList[alarm.ID] == undefined) {
            alarmList[alarm.ID].alarmList = [];
            alarmList[alarm.ID].alarmMsgList = [];
        }

        alarmList[alarm.ID][prop].push(alarm);
    }
}

function saveAlarmListToRedis(alarmList) {
    let keyArrs = [];
    let tableKey = redisKeys.lineAlarm;

    for (let lineCode in alarmList) {
        let alarm = alarmList[lineCode];
        let alarmKey = tableKey + '_' + lineCode;
        keyArrs.push(lineCode);

        redis.setValue(alarmKey, JSON.stringify(alarm), function() {}, function(err) {
            utils.logToConsole('saveAlarmListToRedis Save object ' + alarmKey + ' to redis failed !' + err);
        });

        // if (newJobDate)
        //     saveAlarmToRealTimeData(alarm, lineCode);
    }

    redis.setValue(tableKey, JSON.stringify(keyArrs), function() {}, function(err) {
        utils.logToConsole('saveAlarmListToRedis save table ' + tableKey + ' to redis failed !' + err);
    });
}

function saveAlarmToRealTimeData(data, lineCode) {
    let redisKey = redisKeys.lineRealTime + '_' + lineCode;
    redis.getValue(redisKey, function(reply) {
        let lineData = JSON.parse(reply);
        lineData.robot.alarmList = data.alarmList;
        lineData.robot.alarmMsgList = data.alarmMsgList;

        redis.setValue(redisKey, JSON.stringify(lineData), function() {}, function(err) {
            utils.logToConsole('saveAlarmToRealTimeData set err' + err);
        });
    }, function(err) {
        utils.logToConsole('saveAlarmToRealTimeData get err' + err);
    });
}

exports.saveTotalLinesToRedis = function(sqlData) {
    saveGroups(sqlData[0]);
    redis.sqlTableToRedis(sqlData[1], redisKeys.totalLinesSummary.keyName, redisKeys.totalLinesSummary.keyFields);
    redis.sqlTableToRedis(sqlData[2], redisKeys.totalLinesCncRunRate.keyName, redisKeys.totalLinesCncRunRate.keyFields);
    redis.sqlTableToRedis(sqlData[3], redisKeys.totalLinesRobotRunRate.keyName, redisKeys.totalLinesRobotRunRate.keyFields);
    saveTotalLinesCNC(sqlData[4]);
    saveGroupsTitle(sqlData[5][0]);
}

function saveGroups(data) {
    redis.setValue(redisKeys.totalLinesGroups, JSON.stringify(data), function() {}, function(err) {
        utils.logToConsole('saveGroups err ' + err);
    });
}

function saveTotalLinesCNC(data) {
    let lines = {};
    for (let i in data) {
        let lineCode = data[i].RobotLineCode;
        let groudId = data[i].ID;
        let rowKey = groudId + '_' + lineCode;
        if (lines[rowKey] == undefined)
            lines[rowKey] = [];
        lines[rowKey].push(data[i]);
    }

    redis.objectToRedis(lines, redisKeys.totalLinesCnc.keyName);
}

function saveGroupsTitle(data) {
    redis.setValue(redisKeys.totalLinesTitle.keyName, JSON.stringify(data), function() {}, function(err) {
        utils.logToConsole('saveGroupsTitle err ' + err);
    });
}

exports.saveAllLineConfigToRedis = function(sqlData) {
    var lines = {};

    for (let i in sqlData) {
        let row = sqlData[i];
        let lineCode = row.RobotLineCode;

        if (lines[lineCode] == undefined) {
            lines[lineCode] = {
                "cnc": {},
                "robot": {}
            };
        }

        var cncId = '#' + row.LineDir + '_' + row.UIPos;
        var eqpDesc = row.EqpDesc;
        lines[lineCode]["cnc"][cncId] = row;
        lines[lineCode]["cnc"][eqpDesc] = cncId;
    }

    redis.objectToRedis(lines, redisKeys.lineRealTime);
}

exports.saveAlarmConfigToRedis = function(data) {
    let savedData = {};
    savedData.alarmTypeList = [];

    for (let i = 0; i < data.length; i++) {
        let alarm = data[i];
        savedData[alarm['AlarmID']] = alarm;
        if (savedData.alarmTypeList.indexOf(alarm.AlarmType) == -1)
            savedData.alarmTypeList.push(alarm.AlarmType);
    }

    redis.setValue(redisKeys.alarmListConfig, JSON.stringify(savedData), function() {}, function(err) {
        utils.logToConsole('saveAlarmConfigToRedis err ' + err);
    });
}

exports.saveKpiToRedis = function(sqlData) {
    redis.setValue(redisKeys.kpi, JSON.stringify(sqlData), function() {}, function(err) {
        utils.logToConsole('saveKpiToRedis err ' + err);
    });
}

exports.saveRobotMotionToRedis = function(sqlData) {
    redis.sqlTableToRedis(sqlData, redisKeys.lineMotion.keyName, redisKeys.lineMotion.keyFields);
}

exports.saveTraysToRedis = function(sqlData) {
    redis.sqlTableToRedis(sqlData, redisKeys.lineTray.keyName, redisKeys.lineTray.keyFields);
}

exports.saveRobotTransferToRedis = function(sqlData) {
    redis.sqlTableToRedis(sqlData, redisKeys.lineRobot.keyName, redisKeys.lineRobot.keyFields);
}