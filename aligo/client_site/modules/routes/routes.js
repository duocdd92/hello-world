/*
 * app.get : response web page
 * app.post: request data to server
 */
var views = require('./views.js');
var controller = require('../controllers/controllers.js');

module.exports = function(app) {
    app.get('/', views.layout);
    app.get('/layout', views.layout);
    app.get('/ajax/layout-get', controller.getLayoutData);
    app.get('/ajax/select-line/:lineCode', controller.getGroupByLineCode);

    app.get('/kpi', views.kpi);
    app.get('/ajax/kpi', controller.getKpi);

    app.get('/total-line-status', views.totalLines);
    app.get('/total-line-status/:groupId', views.totalLines);
    app.get('/ajax/total-line-status-get', controller.getTotalLines);
    app.get('/ajax/total-line-status-get/:groupId', controller.getTotalLines);
    app.get('/ajax/groups-list', controller.getGroupsList);

    app.get('/line-status', views.line);
    app.get('/line-status/:groupId/:lineCode', views.line);
    app.get('/ajax/line-status-get', controller.getLineData);
    app.get('/ajax/line-status-get/:lineCode', controller.getLineData);
    app.get('/ajax/lines-list/:groupId', controller.getLinesListByGroupId);
    app.get('/ajax/mk-photo-get/:lineCode', controller.getMkPhotos);
    app.get('/ajax/blackbox-ip-get/:lineCode', controller.getBloxIp);

    app.get('/cctv', views.cctv);
    app.get('/cctv/:groupId', views.cctv);

    app.get('/report', views.report);
    app.get('/ajax/report', controller.getReportWeek);
    app.get('/download', views.download);
};