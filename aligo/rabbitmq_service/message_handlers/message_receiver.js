var amqp = require('amqplib/callback_api');
var dataConfig = require('../config/static_data.js');
var utils = require('../utils/utils.js');
var rabbit = require('../rabbit.js');
var parser = require('./parser.js');
var hanldler = require('./message_handlers.js');
var self = this;
var isTesting = false;
var testSendMessToLocalComputer = false;
var queueNames = [];
var rabbitConfig = dataConfig.rabbitConfigs;

for (var key in rabbitConfig.rabbitQueueNames) {
    queueNames.push(rabbitConfig.rabbitQueueNames[key]);
}

rabbit.setListener(function(msg) {
    var queueName = msg.fields.routingKey;
    var strData = String.fromCharCode.apply(String, msg.content);
    data = JSON.parse(strData);
    // utils.logToConsole("Received " + msg.fields.routingKey + " message '" + data.message.header.name);
    if ((isTesting && queueName != 'TEST') || (!isTesting && (queueName == 'TEST'))) {
        if (queueName === "RSS" && testSendMessToLocalComputer) {
            //utils.logToConsole("Received " + msg.fields.routingKey + " message '" + data.name);
            sendMessageToPersonalRabbitMQ(strData);
        }
        return;
    }
    try {
        // if (queueName !== "RSSxml") {
        //     data = JSON.parse(data);
        // }
        //utils.logToConsole("Received " + msg.fields.routingKey + " message '" + data.name + "': \n" + msg.content);
        messageAdapter(data, queueName);
    } catch (err) {}
});

rabbit.connect(queueNames, rabbitConfig.exchangeName, function(err) {
    console.log(err);
});

/******************************* for sent message test to personal computer ******************************/
var chanel;
var sendMessageToPersonalRabbitMQ = function(stringData) {
    var ex = 'myExchange';
    var queuename = 'REAL_MESSAGE';
    try {
        chanel.assertExchange(ex, 'direct', { durable: false });
        chanel.publish(ex, queuename, new Buffer(stringData));
        //utils.logToConsole("rabbited send to personal computer RabbitMQ success");
    } catch (e) {
        //utils.logToConsole("rabbited send to personal computer RabbitMQ fail");
    }
};

if (testSendMessToLocalComputer) {
    amqp.connect('amqp://107.113.192.60', function(err, conn) {
        try {
            conn.createChannel(function(err, ch) {
                chanel = ch;
                utils.logToConsole("Connected to 107.113.192.60 computer RabbitMQ");
            });
        } catch (e) {
            utils.logToConsole("create connection to personal computer RabbitMQ fail");
        }
    });
}
/**************************************************************************************** */

var old = 0;
var currentTime = new Date().getTime();
var msg = 'SND_MOVE_START SND_MOVE_END SND_CNCPICKUP_END SND_CNCPICKUP_START SND_LOAD_END SND_LOAD_START SND_MOVE_END SND_MOVE_START';
var listMess = {
    // "SND_CNC_STATE": 0,
    // "SND_MOVE_START": 0,
    // "SND_MOVE_END": 0,
    // "SND_LOAD_START": 0,
    // "SND_LOAD_END": 0,
    // "SND_UNLOAD_START": 0,
    // "SND_UNLOAD_END": 0,
    // "RSP_RCS_STATE": 0,
    // "SND_TRAYPICKUP_START": 0,
    // "SND_TRAYPICKUP_END": 0,
    // "SND_FEEDING_START": 0,
    // "SND_FEEDING_END": 0,
    // "SND_TRAYCHANGE_START": 0,
    // "SND_TRAYCHANGE_END": 0
};
var count = 0;
var time = 1;
var service;

function messageAdapter(message, queueName) {
    if (queueName === "RSSxml") {
        count++;
        if (count < 2) {
            console.log("other queue : " + count);
        }
        return;
    }
    var messageName = message.message.header.name;
    var robotlinecode = message.message.header.rssid;
    count++;
    var diffTime = new Date().getTime() - currentTime;
    if (diffTime < 5000) {
        time += diffTime;
    }
    utils.logToConsole("message hanldler " + messageName + ' - ' + count + ', time - ' + (diffTime) + ", average time: " + (count / time));
    currentTime = new Date().getTime();
    switch (messageName) {
        case "SND_CNC_STATE":
            hanldler.handleSndCncState(message);
            break;
        case "SND_MOVE_START":
            hanldler.handleSndMoveStart(message);
            break;
        case "SND_MOVE_END":
            hanldler.handleSndMoveEnd(message);
            break;
        case "SND_LOAD_START":
            hanldler.handleSndLoadStart(message);
            break;
        case "SND_LOAD_END":
            hanldler.handleSndLoadEnd(message);
            break;
        case "SND_UNLOAD_START":
            hanldler.handleSndUnloadStart(message);
            break;
        case "SND_UNLOAD_END":
            hanldler.handleSndUnloadEnd(message);
            break;
        case "RSP_RCS_STATE":
            hanldler.handleRspRceState(message);
            break;
        case "SND_TRAYPICKUP_START":
            if (!validTrayPickup(message)) return;
            hanldler.handleSndTraypickup(message);
            break;
        case "SND_TRAYPICKUP_END":
            if (!validTrayPickup(message)) return;
            hanldler.handleSndTraypickup(message);
            break;
        case "SND_FEEDING_START":
            hanldler.handleSndFeeding(message);
            break;
        case "SND_FEEDING_END":
            hanldler.handleSndFeeding(message);
            break;
        case "SND_TRAYCHANGE_START":
            if (!validTrayChange(message)) return;
            hanldler.handleTraychange(message);
            break;
        case "SND_TRAYCHANGE_END":
            if (!validTrayChange(message)) return;
            hanldler.handleTraychange(message);
            break;
        default:
            //sndMoveStart(message);
            break;
    }
    //checkingWriteMessage(message);
}

function validTrayChange(msg) {
    let trayNo = Number(msg.message.body.trayno);
    if (isNaN(trayNo) || trayNo > lineInfo.trayNo)
        return false;
    return true;
}

function validTrayPickup(msg) {
    let trayNo = Number(msg.message.body.trayno);
    if (isNaN(trayNo) || trayNo > lineInfo.trayNo)
        return false;
    let row = Number(msg.message.body.row);
    if (isNaN(row) || row > lineInfo.trayRows)
        return false;
    let col = Number(msg.message.body.col);
    if (isNaN(col) || col > lineInfo.trayRows)
        return false;
    return true;
}

let messageCheckingTime = {
    "SND_CNC_STATE": {},
    "SND_MOVE_START": {},
    "SND_MOVE_END": {},
    "SND_LOAD_START": {},
    "SND_LOAD_END": {},
    "SND_UNLOAD_START": {},
    "SND_UNLOAD_END": {},
    "RSP_RCS_STATE": {},
    "SND_TRAYPICKUP_START": {},
    "SND_TRAYPICKUP_END": {},
    "SND_FEEDING_START": {},
    "SND_FEEDING_END": {},
    "SND_TRAYCHANGE_START": {},
    "SND_TRAYCHANGE_END": {}
}

for (var item in messageCheckingTime) {
    messageCheckingTime[item] = { collectStartTime: new Date().getTime() };
}

var writeMessageThressholdTime = 1000;

function checkingWriteMessage(message) {
    let messageRedisData = null;
    let messageName = message.message.header.name;
    switch (messageName) {
        case "SND_CNC_STATE":
            messageRedisData = parser.SND_CNC_STATE(message);
            break;
        case "SND_MOVE_START":
            break;
        case "SND_MOVE_END":
            break;
        case "SND_LOAD_START":
            break;
        case "SND_LOAD_END":
            break;
        case "SND_UNLOAD_START":
            break;
        case "SND_UNLOAD_END":
            break;
        case "RSP_RCS_STATE":
            break;
        case "SND_TRAYPICKUP_START":
            break;
        case "SND_TRAYPICKUP_END":
            break;
        case "SND_FEEDING_START":
            break;
        case "SND_FEEDING_END":
            break;
        case "SND_TRAYCHANGE_START":
            break;
        case "SND_TRAYCHANGE_END":
            break;
        default:
            //sndMoveStart(message);
            break;
    }
    // write data message to database
    service.writeMessageDataToRedis(messageRedisData);
    //check write database
    if (new Date().getTime() - messageCheckingTime[messageName].collectStartTime >= writeMessageThressholdTime) {
        var data = null; // get from redis -> convert to DB data
        service.writeMsgDataToDB(data);
    }
};