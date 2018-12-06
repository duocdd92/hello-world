var db = require('../database/db_query.js');
var services = require('../services/services.js');

exports.getLayoutData = function(req, res) {
    services.getTotalLines(undefined, function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}

exports.getGroupByLineCode = function(req, res) {
    let lineCode = req.params['lineCode'];
    db.getGroupByLineCode(lineCode, function(data) {
        res.json(data);
    }, function() {
        res.json({});
    });
}

exports.getKpi = function(req, res) {
    services.getKpi(function(data) {
        res.json(data);
    }, function() {
        res.json({});
    });
}

exports.getTotalLines = function(req, res) {
    let groupId = req.params['groupId'];
    services.getTotalLines(groupId, function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}

exports.getGroupsList = function(req, res) {
    db.getGroupsList(function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}

exports.getLineData = function(req, res) {
    let lineCode = req.params['lineCode'];
    services.getLineData(lineCode, function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}

exports.getLinesListByGroupId = function(req, res) {
    let groupId = req.params['groupId'];
    db.getLinesListByGroupId(groupId, function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}

exports.getMkPhotos = function(req, res) {
    let lineCode = req.params['lineCode'];
    db.getMkPhotos(lineCode, function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}

exports.getBloxIp = function(req, res) {
    let lineCode = req.params['lineCode'];
    db.getBloxIp(lineCode, function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}

exports.getReportWeek = function(req, res) {
    db.getReportWeek(lineCode, function(data) {
        res.json(data);
    }, function() {
        res.json([]);
    });
}