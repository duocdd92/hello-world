var amqp = require('amqplib/callback_api');
var mQueueNames = [];
var mExchange = 'myExchange';
var mListener = function(msg) {
    console.log(msg);
}
exports.setListener = function(listener) {
    mListener = listener;
}
exports.connect = function(queueNames, exchange, errorCallback) {
    if (queueNames) {
        mQueueNames = queueNames;
    }
    if (exchange) {
        mExchange = exchange;
    }
    if (!errorCallback) {
        errorCallback = function(err) {
            console.log(err);
        }
    }
    amqp.connect('amqp://localhost', function(err, conn) {
        if (err) {
            errorCallback(err);
        } else {
            conn.createChannel(function(err, ch) {
                if (err) {
                    errorCallback(err);
                } else {
                    ch.assertExchange(mExchange, 'direct', { durable: false });
                    ch.assertQueue('', { exclusive: true }, function(err, q) {
                        console.log(' [*] Waiting for logs. To exit press CTRL+C');
                        mQueueNames.forEach(function(severity) {
                            ch.bindQueue(q.queue, mExchange, severity);
                        });
                        ch.consume(q.queue, function(msg) {
                            //console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                            mListener(msg);
                        }, { noAck: true });
                    });
                }
            });
        }
    });
}