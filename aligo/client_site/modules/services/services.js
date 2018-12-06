var utils = require('../../../common/utils/utils.js');
var redis = require('../../../common/redis.js');
var dataConfig = require('../../../common/config/data_config.js');
var lineData = dataConfig.lineData;
var redisKeys = dataConfig.redisKeys;

exports.getKpi = function(success, error) {
    redis.getValue(redisKeys.kpi, function(data) {
        success(JSON.parse(data));
    }, function(err) {
        error();
    });
}

exports.getTotalLines = function(groupId, success, error) {
    let returnData = {
        summary: [],
        cncRunRate: [],
        robotRunRate: [],
        cncList: [],
        title: {}
    }

    let count = 0;
    const NUM_OF_ARR = 5;

    let summaryKey = redisKeys.totalLinesSummary;
    let cncRunRateKey = redisKeys.totalLinesCncRunRate;
    let robotRunRateKey = redisKeys.totalLinesRobotRunRate;
    let cncKey = redisKeys.totalLinesCnc;
    let titleKey = redisKeys.totalLinesTitle.keyName;

    //Summary
    getTotalLinesByKey(summaryKey, groupId, returnData.summary, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    //Cnc run rate
    getTotalLinesByKey(cncRunRateKey, groupId, returnData.cncRunRate, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    //robot run rate
    getTotalLinesByKey(robotRunRateKey, groupId, returnData.robotRunRate, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    //cnc list
    getTotalLinesByKey(cncKey, groupId, returnData.cncList, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    //title
    redis.getValue(titleKey, function(data) {
        returnData.title = JSON.parse(data);
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    }, function(err) {
        utils.logToConsole('getTotalLines err ' + titleKey + err);
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    })
}

function getTotalLinesByKey(redisKey, groupId, returnData, completed) {
    let tableKey = redisKey.keyName;
    let numOfGroups = 0;
    let gettedCnt = 0;

    redis.getValue(tableKey, function(groupList) {
        groupList = JSON.parse(groupList);
        for (let i in groupList) {
            if (groupId == undefined ||
                (groupId != undefined && groupList[index].indexOf(groupId) != -1)) {
                let index = i;
                numOfGroups++;
                let fVals = groupList[index].split('_');
                let lineCode = fVals[1];

                let rowKey = tableKey + '_' + groupId + '_' + lineCode;
                if (groupId == undefined)
                    rowKey = tableKey + '_' + fVals[0] + '_' + lineCode;

                redis.getValue(rowKey, function(row) {
                    row = JSON.parse(row);
                    returnData.push(row);
                    gettedCnt++;
                    if (gettedCnt == numOfGroups) completed();
                }, function(err) {
                    utils.logToConsole('getTotalLinesByKey err ' + rowKey);
                    gettedCnt++;
                    if (gettedCnt == numOfGroups) completed();
                });
            }
        }
    }, function(err) {
        utils.logToConsole('getTotalLinesByKey err' + err);
    });
}

exports.getLineData = function(lineCode, success, error) {
    let returnData = {
        summary: {},
        robTransfer: {},
        motion: {},
        cncs: [],
        alarmList: [],
        alarmMsg: []
    };

    let count = 0;
    const NUM_OF_ARR = 5;

    let summaryKey = redisKeys.lineSummary.keyName + '_' + lineCode;
    let rbTransKey = redisKeys.lineRobotTransfer.keyName + '_' + lineCode;
    let motionKey = redisKeys.lineMotion.keyName + '_' + lineCode;
    let cncKey = redisKeys.lineCnc.keyName + '_' + lineCode;
    let alarmKey = redisKeys.lineAlarm.keyName + '_' + lineCode;

    getLineDataByKey(returnData.summary, summaryKey, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    getLineDataByKey(returnData.robTransfer, rbTransKey, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    getLineDataByKey(returnData.motion, motionKey, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    getLineDataByKey(returnData.cncs, cncKey, function() {
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });

    //Get alarm list
    redis.getValue(alarmKey, function(data) {
        data = JSON.parse(data);
        returnData.alarmList = data.alarmList;
        returnData.alarmMsg = data.alarmMsgList;
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    }, function(err) {
        utils.logToConsole('getLineData err ' + alarmKey + err);
        count++;
        if (count == NUM_OF_ARR) success(returnData);
    });
}

function getLineDataByKey(rtData, key, completed) {
    redis.getValue(key, function(data) {
        rtData = JSON.parse(data);
        completed();
    }, function(err) {
        utils.logToConsole('getLineDataByKey err ' + key + err);
        completed();
    });
}

function assignData(fromObj, toObj, property) {
    if (fromObj[property] != undefined) toObj[property] = fromObj[property];
}