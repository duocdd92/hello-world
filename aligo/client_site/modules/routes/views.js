exports.layout = function(req, res) {
    res.render('layout');
};

exports.kpi = function(req, res) {
    res.render('kpi');
};

exports.totalLines = function(req, res) {
    res.render('total_line_status');
};

exports.line = function(req, res) {
    res.render('line_status');
};

exports.cctv = function(req, res) {
    res.render('cctv');
};

exports.report = function(req, res) {
    res.render('report');
};

exports.download = function(req, res) {
    res.render('download');
};