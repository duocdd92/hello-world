var Q = require("q");
var redis = require('../../common/redis.js');

exports.getRedisData = function(key) {
    let deferred = Q.defer();
    redis.getValue(key, function(data) {
        deferred.resolve(JSON.parse(data));
    }, function(err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

function promiseTest() {
    let data = ['xxx'];
    console.log('start...');
    promise.get('level1')
        .then(function(ok) {
            promise.pushArr(ok, data);
            promise.printArr(data);
            return promise.get('level2')
        }, function(err) {
            console.log(err);
            return promise.get('level2')
        })
        .then(function(reply) {
            promise.pushArr(reply, data);
            promise.printArr(data);
            return promise.get('level3')
        }, function(err) {
            console.log(err);
            return promise.get('level3')
        })
        .then(function(reply) {
            promise.pushArr(reply, data);
            promise.printArr(data);
            return promise.get('level4')
        }, function(err) {
            console.log(err);
            return promise.get('level4')
        })
        .then(function(reply) {
            promise.pushArr(reply, data);
            promise.printArr(data);
            promise.done(data);
        })
        .catch(function(err) {
            console.log(err);
        })
}