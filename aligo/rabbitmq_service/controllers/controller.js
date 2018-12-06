var db = require('../database/db_query.js');
var dataconfig = require('../../common/config/data_config.js');
var status = dataconfig.dbQueryStatus;
var self = this;

exports.getTotalLines = function() {
    if (status.isGettingTotalLines) return;
    status.isGettingTotalLines = true;
    db.getTotalLines(function() {
        status.isGettingTotalLines = false;
        setTimeout(self.getTotalLines, 5000);
    }, function() {
        status.isGettingTotalLines = false;
        setTimeout(self.getTotalLines, 5000);
    });
};

exports.getAllLines = function() {
    if (status.isGettingAllLines) return;
    status.isGettingAllLines = true;
    db.getAllLines(function() {
        status.isGettingAllLines = false;
        setTimeout(self.getAllLines, 5000);
    }, function() {
        status.isGettingAllLines = false;
        setTimeout(self.getAllLines, 5000);
    });
};

exports.getKpi = function() {
    if (status.isGettingKpi) return;
    status.isGettingKpi = true;
    db.getKpi(function() {
        status.isGettingKpi = false;
        setTimeout(self.getKpi, 5000);
    }, function() {
        status.isGettingKpi = false;
        setTimeout(self.getKpi, 5000);
    });
};

exports.getAllLinesConfig = function() {
    db.getAllLinesConfig(function() {}, function() {
        setTimeout(self.getAllLinesConfig, 1000);
    });
};

exports.getAlarmList = function() {
    db.getAlarmInfoConfig(function() {}, function() {
        setTimeout(self.getAlarmList, 1000);
    });
};

exports.getRobotStatus = function() {
    if (status.isGettingRobots) return;
    status.isGettingRobots = true;
    db.getRobotStatus(function() {
        status.isGettingRobots = false;
        setTimeout(self.getRobotStatus, 1000);
    }, function() {
        status.isGettingRobots = false;
        setTimeout(self.getRobotStatus, 5000);
    });
};

exports.getCncState = function() {
    if (status.isGettingCncs) return;
    status.isGettingCncs = true;
    db.getCncState(function() {
        status.isGettingCncs = false;
        setTimeout(self.getCncState, 1000);
    }, function() {
        status.isGettingCncs = false;
        setTimeout(self.getCncState, 5000);
    });
};