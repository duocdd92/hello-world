var dataConfig = require('../../common/config/data_config.js');
var utils = require('../../common/utils/utils.js');
var redis = require('../../common/redis.js');
redis.connect();

var redisKeys = dataConfig.redisKeys;

exports.handleSndCncState = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        sndCncStateSave(JSON.parse(reply), redisKey, message);
    }, function(err) {
        utils.logToConsole('handleSndCncState - get lineRealTimeData err ' + err);
    });
}

function sndCncStateSave(lineRealTimeData, redisKey, message) {
    var cncStates = dataConfig.lineData.cncStates;
    var message = message.message;
    var cnclist = message.body.cnclist.cnc;
    var lineCode = message.header.rssid;
    var cncData = lineRealTimeData.cnc;
    var messageName = message.header.name;

    if (!cncData) return;

    for (var index = 0; index < cnclist.length; index++) {
        var cnc = cnclist[index];
        var eqpDesc = cnc.id; // AM4-K01
        var cncId = cncData[eqpDesc]; // "#l_8

        if (!cncId || !cncData[cncId]) continue;

        if (cnc.stateisnew == 'ON') {
            cncData[cncId].StateStartDateTime = utils.formatDate(new Date());
            cncData[cncId].status_main = cncStates[cnc.status];
            if (cnc.status == 'ALARM') {
                var status_main = 3;
                var alarmmsg = cnc.alarmmsg;
                if (alarmmsg == 'EX1246 ROBOT ALARM') {
                    status_main = 5;
                } else if (alarmmsg.indexOf('ALL TOOL IN SAME GROUP ARE USED') > 0 ||
                    alarmmsg == 'ALL TOOL IN SAME GROUP ARE USED' ||
                    alarmmsg == 'EX1011 ALL TOOL IN SAME GROUP ARE USED') {
                    status_main = 6;
                }
                cncData[cncId].status_main = status_main;
            }
        }

        if (cnc.eventisnew == 'ON') {
            var status_sub = 5;
            if (cnc.nocall == 'ON') {
                status_sub = 2;
            } else if (cnc.robotcall == 'ON') {
                status_sub = 3;
            } else if (cnc.precall == 'ON') {
                status_sub = 4;
            } else if (cnc.lastmachining.value == 'ON') {
                status_sub = 0;
            }
            cncData[cncId].status_sub = status_sub;
        }
    }
    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndCncState - save line realtime data err ' + err);
    });
};

exports.handleSndMoveStart = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;

    redis.getValue(redisKey, function(reply) {
        sndMoveStartSave(JSON.parse(reply), redisKey, message)
    }, function(err) {
        utils.logToConsole('handleSndMoveStart - get robot line code data err ' + err);
    });
}

function sndMoveStartSave(lineRealTimeData, redisKey, message) {
    message = message.message;
    var lineCode = message.header.rssid;
    var robot = lineRealTimeData.robot;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    var cncData = lineRealTimeData.cnc;
    var messageName = message.header.name;
    var currentLocation = message.body.currentlocation;
    var nextLocation = message.body.nextlocation;
    var arrival;
    var departure;
    let cncId;

    if (cncData[currentLocation]) {
        cncId = cncData[currentLocation];
        if (cncData[cncId]) departure = cncData[cncId].UIPos;
    }

    if (cncData[nextLocation]) {
        cncId = cncData[nextLocation];
        if (cncData[cncId]) arrival = cncData[cncId].UIPos;
    }

    robot.Departure = departure;
    robot.Arrival = arrival;
    robot.IsMoving = 'Y';
    robot.WorkingPos = currentLocation;
    robot.currentlocation = currentLocation;
    robot.nextlocation = nextLocation;
    robot.moving_desc = 'qc_RTU is Moving : [ ' + currentLocation + ' ] → [ ' + nextLocation + ' ]';
    robot.CreateDateTime = new Date().getTime();
    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndMoveStart - save robot line err ' + err);
    });
};

exports.handleSndMoveEnd = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        sndMoveEndSave(JSON.parse(reply), message, redisKey)
    }, function(err) {
        utils.logToConsole('handleSndMoveEnd - get robot line code data err ' + err);
    });
}

function sndMoveEndSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var robot = lineRealTimeData.robot;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    var cncData = lineRealTimeData.cnc;
    var currentlocation = message.body.currentlocation;
    var nextlocation = message.body.nextlocation;
    var arrival = undefined;
    var departure = undefined;

    if (cncData[currentlocation]) {
        var cncId = cncData[currentlocation];
        if (cncData[cncId]) departure = cncData[cncId].UIPos;
    }
    if (cncData[nextlocation]) {
        var cncId = cncData[nextlocation];
        if (cncData[cncId]) arrival = cncData[cncId].UIPos;
    }

    robot.Departure = departure;
    robot.Arrival = arrival;
    robot.IsMoving = 'N';
    robot.WorkingPos = nextlocation;
    robot.currentlocation = currentlocation;
    robot.nextlocation = nextlocation;
    robot.moving_desc = 'qc_RTU stay at [ ' + nextlocation + ' ] ';
    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndMoveEnd - save robot line err ' + err);
    });
};

/*************************************** for SND_LOAD_START message *******************************************/
exports.handleSndLoadStart = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        sndLoadStartSave(JSON.parse(reply), message, redisKey);
    }, function(err) {
        utils.logToConsole('handleSndLoadStart - get robot line code data err ' + err);
    });
}

function sndLoadStartSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var cncName = message.body.currentlocation;
    var robot = lineRealTimeData.robot;
    var cncData = lineRealTimeData.cnc;
    var cncId = cncData[cncName];
    var lineDir = undefined;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    if (cncData[cncId]) lineDir = cncData[cncId].LineDir;

    robot.isLoadEnd = false;

    if (lineDir == 'r') {
        robot.robot_top_view = 1;
    } else if (lineDir == 'l') {
        robot.robot_top_view = 2;
    }

    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndLoadStart - save robot line err ' + err);
    });
}

/*************************************** for SND_LOAD_END message *******************************************/
exports.handleSndLoadEnd = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        sndLoadEndSave(JSON.parse(reply), message, redisKey);
    }, function(err) {
        utils.logToConsole('handleSndLoadEnd - get robot line code data err ' + err);
    });
}

function sndLoadEndSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var robot = lineRealTimeData.robot;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    robot.isLoadEnd = true;

    if (robot.isUnloadEnd) robot.robot_top_view = 0;

    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndLoadEnd - save robot line err ' + err);
    });
}

/*************************************** for SND_UNLOAD_START message *******************************************/
exports.handleSndUnloadStart = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        sndUnloadStartSave(JSON.parse(reply), message, redisKey);
    }, function(err) {
        utils.logToConsole('handleSndUnloadStart - get robot line code data err ' + err);
    });
}

function sndUnloadStartSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var cncName = message.body.currentlocation;
    var robot = lineRealTimeData.robot;
    var cncData = lineRealTimeData.cnc;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    var cncId = cncData[cncName];
    var lineDir = undefined;

    if (cncData[cncId]) lineDir = cncData[cncId]['LineDir'];

    robot.isUnloadEnd = false;

    if (lineDir == 'r') {
        robot.robot_top_view = 1;
    } else if (lineDir == 'l') {
        robot.robot_top_view = 2;
    } else {
        robot.robot_top_view = undefined;
    }

    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndUnloadStart - save robot line err ' + err);
    });
}

/*************************************** for SND_UNLOAD_END message *******************************************/
exports.handleSndUnloadEnd = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        sndUnloadEndSave(JSON.parse(reply), message, redisKey)
    }, function(err) {
        utils.logToConsole('handleSndUnloadEnd - get robot line code data err ' + err);
    });
}

function sndUnloadEndSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var robot = lineRealTimeData.robot;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    robot.isUnloadEnd = true;

    if (robot.isLoadEnd) {
        robot.robot_top_view = 0;
    }

    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndUnloadEnd - save robot line err ' + err);
    });
}

/*************************************** for RSP_RCS_STATE message *******************************************/
exports.handleRspRceState = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        rspRcsStateSave(JSON.parse(reply), message, redisKey);
    }, function(err) {
        utils.logToConsole('handleRspRceState - get robot line code data err ' + err);
    });
}

function rspRcsStateSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var robotStates = dataConfig.lineData.robotStates;
    var lineCode = message.header.rssid;
    var state = message.body.state;
    var mode = message.body.mode;
    var alarmCode = message.body.alarmcode;
    var currentLocation = message.body.currentlocation;
    var test = message.body.test;
    var time = message.header.time;
    var robot = lineRealTimeData.robot;
    var statecode = robotStates[state];

    if (statecode == undefined) statecode = 5;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    robot.CurState = state;
    robot.CurStateCode = statecode;
    robot.alarmcode = alarmCode;

    let currDateTime = new Date();
    if (state == 'ALARM' && alarmCode != undefined && alarmCode > 0 && alarmCode != '4034418') {
        redis.getValue(redisKeys.alarmListConfig, function(reply) {
            var alarmType = 'Etc';
            var alarmConfig = JSON.parse(reply);

            if (alarmConfig[alarmCode]) {
                alarmType = alarmConfig[alarmCode].AlarmType;
                robot.AlarmDesc = alarmConfig[alarmCode].Description;
            } else {
                robot.AlarmDesc = 'Unknown Alarm';
            }

            //Initial alarm list
            if (!robot.alarmList) {
                robot.alarmList = [];
                let alarmTypeList = alarmConfig.alarmTypeList;
                for (let i in alarmTypeList) {
                    robot.alarmList.push({ ID: lineCode, AlarmType: alarmTypeList[i], AlarmCnt: 0 });
                }
            }

            if (!robot.alarmMsgList) robot.alarmMsgList = [];

            updateAlarmList(robot, lineCode, alarmType, currDateTime, function() {
                redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function(reply) {}, function(err) {
                    utils.logToConsole('handleRspRceState - save robot line err alarmMsgList ' + err);
                });
            });

        }, function(err) {
            utils.logToConsole('rspRcsStateSave get alarm list err ' + err);
        });
    }

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleRspRceState - save robot line err 3 ' + err);
    });
}

function updateAlarmList(robot, lineCode, alarmType, currTime, callback) {
    let alarmList = robot.alarmList;
    let alarmMsgList = robot.alarmMsgList;
    let msg = robot.AlarmDesc;
    var alarmMsg = currTime.getHours() + ':' + currTime.getMinutes() + ':' + currTime.getSeconds();
    alarmMsg = alarmMsg + ' - ' + msg;

    if (alarmMsgList.length === 0) {
        alarmMsgList.push({ ID: lineCode, msg: alarmMsg, AlarmType: alarmType, CreateDateTime: currTime });
    } else {
        for (let i = 0; i < alarmMsgList.length; i++) {
            if (alarmMsgList[i].AlarmType == alarmType && alarmMsgList[i].msg.indexOf(msg) !== -1) {
                let sec = currTime - new Date(alarmMsgList[i].CreateDateTime);
                sec = Math.floor(sec / 1000);
                let newMsg = alarmMsg + ' (' + sec + ' sec)';
                alarmMsgList.push({ ID: lineCode, msg: newMsg, AlarmType: alarmType, CreateDateTime: alarmMsgList[i].CreateDateTime });
                break;
            }
            if (i === alarmMsgList.length - 1) {
                alarmMsgList.push({ ID: lineCode, msg: alarmMsg, AlarmType: alarmType, CreateDateTime: currTime });
                break;
            }
        }
    }

    for (let i = 0; i < alarmList.length; i++) {
        if (alarmList[i].AlarmType == alarmType) {
            alarmList[i].AlarmCnt += 1;
            break;
        }
    }

    callback();
}

/*************************************** for SND_TRAYPICKUP message *******************************************/
exports.handleSndTraypickup = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;
    redis.getValue(redisKey, function(reply) {
        traypickupSave(JSON.parse(reply), message, redisKey);
    }, function(err) {
        utils.logToConsole('handleSndTraypickup - get robot line code data err ' + err);
    });
}

function traypickupSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var trayno = message.body.trayno;
    var row = message.body.row;
    var col = message.body.col;
    var robot = lineRealTimeData.robot;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    robot.TrayNo = trayno;
    robot.RowPosition = row;
    robot.ColumnPosition = col;

    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndTraypickup - save robot line err ' + err);
    });
}

exports.handleSndFeeding = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;

    redis.getValue(redisKey, function(reply) {
        sndFeedingSave(JSON.parse(reply), message, redisKey);
    }, function(err) {
        utils.logToConsole('handleSndFeeding - get robot line code data err ' + err);
    });
}

function sndFeedingSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var robot = lineRealTimeData.robot;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleSndFeeding - save robot line err ' + err);
    });
}

exports.handleTraychange = function(message) {
    var redisKey = redisKeys.lineRealTime + '_' + message.message.header.rssid;

    redis.getValue(redisKey, function(reply) {
        trayChangeSave(JSON.parse(reply), message, redisKey);
    }, function(err) {
        utils.logToConsole('handleTraychange - get robot line code data err ' + err);
    });
}

function trayChangeSave(lineRealTimeData, message, redisKey) {
    message = message.message;
    var lineCode = message.header.rssid;
    var trayno = message.body.trayno;
    var robot = lineRealTimeData.robot;

    if (!robot) {
        lineRealTimeData.robot = {};
        robot = lineRealTimeData.robot;
    }

    robot.TrayNo = trayno;

    updateMotionByMessage(robot, message);

    redis.setValue(redisKey, JSON.stringify(lineRealTimeData), function() {}, function(err) {
        utils.logToConsole('handleTraychange - save robot line err ' + err);
    });
}

function updateMotionByMessage(robot, message) {
    var data = message.header;
    robot.teaching = data.name;
    var currentTime = new Date().getTime();
    var endDateTimeUpd;
    var second;
    var beginDateTime;

    if (data.name.indexOf('START') !== -1) {
        robot.motion_begin = utils.formatDate(new Date(data.time));
        second = Math.abs(currentTime - new Date(data.time).getTime());
        workingTime();
    } else {
        if (!robot.motion_begin) { return };
        var beginDateTime = new Date(robot.motion_begin).getTime();
        var endDateTime = utils.formatDate(new Date(data.time));
        second = Math.abs(currentTime - beginDateTime);
        if (data.time) {
            if (second / 1000 > 1800) {
                endDateTimeUpd = endDateTime + ' (--)';
            } else {
                endDateTimeUpd = endDateTime + ' (' + Math.abs(Math.round((new Date(data.time).getTime() - currentTime) / 1000)) + 's)';
            }
        } else {
            workingTime();
        }
    }

    robot.motion_end = endDateTimeUpd;

    function workingTime() {
        if (second / 1000 > 1800) {
            endDateTimeUpd = 'working (--)';
        } else if (second / 1000 > 10) {
            endDateTimeUpd = 'working' + ' (' + Math.round(second / 1000) + 's)';
        } else {
            endDateTimeUpd = 'working' + ' (' + Math.round(second / 100) + 'ms)';
        }
    }
}