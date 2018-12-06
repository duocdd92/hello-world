var redis = require('redis');
var utils = require('./utils/utils.js');
var client = redis.createClient();
var self = this;

exports.connect = function(callback) {
    client.on('connect', function() {
        console.log('redis client is connected');
    });
};

exports.setValue = function(key, value, callbackSuccess, callbackError) {
    client.set(key, value, function(err, reply) {
        if (err) {
            callbackError(err);
        } else {
            callbackSuccess(reply);
        }
    });
};

exports.getValue = function(key, callbackSuccess, callbackError, index) {
    //console.log("------------------------------------ get key " + key);
    client.get(key, function(err, reply) {
        if (err) {
            callbackError(err, index);
        } else {
            if (!reply) {
                callbackError(err, index);
            } else {
                callbackSuccess(reply, index);
            }
        }
    });
};

/************************* for table **********************************/
exports.sqlTableToRedis = function(sqlData, tableKey, keyFields) {
    let keyArrs = [];

    for (let i in sqlData) {
        let redisData = sqlData[i];
        let key = utils.createRedisKey(redisData, tableKey, keyFields);
        keyArrs.push(key.tableVal);
        self.setValue(key.rowKey, JSON.stringify(redisData), function() {}, function(err) {
            utils.logToConsole('redis sqlTableToRedis Save row ' + key + ' to redis failed !' + err);
        });
    }

    self.setValue(tableKey, JSON.stringify(keyArrs), function() {}, function(err) {
        utils.logToConsole('redis sqlTableToRedis Save table ' + tableKey + ' to redis failed !' + err);
    });
}

exports.objectToRedis = function(object, tableKey) {
    let keyArrs = [];

    for (let prop in object) {
        let redisData = JSON.stringify(object[prop]);
        let key = tableKey + '_' + prop;
        keyArrs.push(prop);
        self.setValue(key, redisData, function() {}, function(err) {
            utils.logToConsole('redis objectToRedis Save object ' + key + ' to redis failed !' + err);
        });
    }

    self.setValue(tableKey, JSON.stringify(keyArrs), function() {}, function(err) {
        utils.logToConsole('redis objectToRedis Save table ' + tableKey + ' to redis failed !' + err);
    });
}

exports.addRowToTable = function(tableName, keyValue, valueObject, callbackSuccess, callbackError, listExceptKeys) {
    var redisKey = tableName + "_" + keyValue;
    checkExistsKey(redisKey, function(reply, data) {
        if (!reply) {
            self.setValue(redisKey, JSON.stringify(valueObject), callbackSuccess, callbackError);
        } else {
            for (var key in listExceptKeys) {
                valueObject[key] = data[key];
            }
            client.set(redisKey, JSON.stringify(valueObject), function(err, reply) {
                if (err) {
                    callbackError(err);
                } else {
                    callbackSuccess(reply);
                }
            });
        }
    });
};

exports.updateRowToTableByKeys = function(tableName, keyValue, valueObject, callbackSuccess, callbackError) {
    var redisKey = tableName + "_" + keyValue;
    checkExistsKey(redisKey, function(reply, data) {
        if (!reply) {} else {
            for (var key in valueObject) {
                data[key] = valueObject[key];
            }
            client.set(redisKey, JSON.stringify(data), function(err, reply) {
                if (err) {
                    callbackError(err);
                } else {
                    callbackSuccess(reply);
                }
            });
        }
    });
};

exports.getRowInTableByKey = function(tableName, keyValue, callbackSuccess, callbackError) {
    //getHashesData(tableName + "_" + keyValue, resultKeysArray, callbackSuccess, callbackError);
    //console.log("-------------" + tableName + "_" + keyValue);
    self.getValue(tableName + "_" + keyValue, function(data) {
        //console.log("----- get row ---: " + data);
        var data = JSON.parse(data);
        callbackSuccess(data);
    }, callbackError)
};

exports.getTableData = function(tableName, callbackSuccess, callbackError, index) {
    self.getValue(tableName, function(data) {
        var data = JSON.parse(data);
        //console.log("--------------------- " + tableName + "----" + data.length);
        if (!data) {
            callbackError("null data", index);
            return;
        }
        var count = 0;
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var key = tableName + "_" + data[i];
            self.getRowInTableByKey(tableName, data[i], function(row) {
                count++;
                result.push(row);
                if (count === data.length) {
                    callbackSuccess(result, index);
                }
            }, function(err) {
                count++;
                if (count === data.length) {
                    if (result.length === 0) {
                        callbackError(err);
                    } else {
                        callbackSuccess(result, index);
                    }
                }
                //console.log(err);
            })
        }
    }, function(err) {
        callbackError(null, index);
    })
};

exports.getObjectByTableData = function(tableName, callbackSuccess, callbackError) {
    self.getValue(tableName, function(data) {
        let keysArr = JSON.parse(data);
        if (!data) {
            callbackError(null);
            return;
        }
        var result = {};
        var count = 0;
        for (let i = 0; i < keysArr.length; i++) {
            let key = keysArr[i];
            let redisKey = tableName + "_" + key;
            self.getValue(redisKey, function(dataRow) {
                count++;
                result[key] = JSON.parse(dataRow);
                if (count == keysArr.length)
                    callbackSuccess(result);
            }, function(err) {
                console.log('getObjectByTableData error - 1');
                console.log(err);
                count++;
                if (count == keysArr.length) {
                    if (!result) {
                        callbackError(null);
                    } else {
                        callbackSuccess(result);
                    }
                }
            });
        }
    }, function(err) {
        console.log('getObjectByTableData error - 2')
        console.log(err);
        callbackError(null);
    });
};

/**************************** for object ********************************/
exports.saveObjectData = function(hashKey, valueObject, callbackSuccess, callbackError) {
    addHashesData(hashKey, valueObject, callbackSuccess, callbackError);
};
exports.getObjectData = function(hashKey, datasNameArray, callbackSuccess, callbackError) {
    getHashesData(hashKey, datasNameArray, callbackSuccess, callbackError);
};
/********************************* Ultils functions *********************************/

function addSetData(setName, value, callbackSuccess, callbackError) {
    client.sadd(setName, value, function(err, reply) {
        callbackSuccess(reply);
    }, callbackError);
};

function addHashesData(hashName, valueObject, callbackSuccess, callbackError) {
    client.hmset(hashName, valueObject),
        function(err, reply) {
            if (err) {
                callbackError(err);
            } else {
                callbackSuccess(reply);
            }
        };
};

function getHashesData(hashName, datasNameArray, callbackSuccess, callbackError) {
    client.hmget(hashName, datasNameArray,
        function(err, reply) {
            if (err) {
                callbackError(err);
            } else {
                callbackSuccess(reply);
            }
        });
};

function checkExistsKey(key, callback) {
    client.get(key, function(err, data) {
        // data is null if the key doesn't exist
        if (err || data === null) {
            callback(false, null);
        } else {
            callback(true, JSON.parse(data));
        }
    });
};