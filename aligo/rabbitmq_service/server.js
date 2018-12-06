// require('./message_handlers/message_receiver');
var dbConnection = require('./controllers/controller.js');
dbConnection.getTotalLines();
dbConnection.getKpi();
dbConnection.getAllLines();
// dbConnection.getRobotStatus();
// dbConnection.getCncState();
// dbConnection.getAllLinesConfig();
// dbConnection.getAlarmList();