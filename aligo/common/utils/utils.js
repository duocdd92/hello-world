const HOUR = 'HOUR';
const DAY = 'DAY';
var sql = require('mssql');
exports.logToConsole = function(string) {
    console.log("\n----------------------------------------------------- \n-My Log-- " + string + " \n-----------------------------------------------------");
}
exports.findObjectIndexInArray = function(array, fieldName, fieldValue) {
    //console.log(fieldValue);
    for (var i = 0; i < array.length; i++) {
        if (array[i][fieldName] == fieldValue) {
            return i;
        }
    }
    return -1;
}
var fs = require('fs');
exports.writeLogFile = function(fileName, text) {
    var logger = fs.createWriteStream(fileName + '.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    logger.write(text + '\n') // append string to your file
    logger.close();
}
exports.saveRowsOfTableToRedis = function(redis, tableName, keyNameList, tableData, listExeptKeys) {
    //this.logToConsole('setRowsOfTableToRedis - ' + tableName);
    var keysArray = [];
    for (var i = 0; i < tableData.length; i++) {
        var key = '';
        key = tableData[i][keyNameList[0]];
        for (var j = 1; j < keyNameList.length; j++) {
            key += '_';
            key += tableData[i][keyNameList[j]];
        }
        if (keysArray.indexOf(tableData[i][key]) === -1) {
            keysArray.push(tableData[i][key]);
        }
        redis.addRowToTable(tableName, key, tableData[i], function(reply) {}, function(err) {
            console.log("-----------setRowsOfTableToRedis------" + err);
        }, listExeptKeys);
    }
    redis.setValue(tableName, JSON.stringify(keysArray), function() {}, function() {});
}
exports.saveRowsFromObjectToRedis = function(redis, tableName, objectData) {
        //this.logToConsole('saveObjectToRedis - ' + tableName);
        var keysArray = [];
        var rowsKey = Object.keys(objectData);
        for (var i in rowsKey) {
            var key = rowsKey[i];
            if (keysArray.indexOf(key) === -1) {
                keysArray.push(key);
            }
            redis.addRowToTable(tableName, key, objectData[key], function(reply) {}, function(err) {
                console.log('saveRowsFromObjectToRedis------' + err);
            });
        }
        redis.setValue(tableName, JSON.stringify(keysArray), function() {}, function() {});
    }
    /**
     * 
     * @param {*} sql 
     * @param {*} columnsArray: 
                        [
                            { name: "1", type: sql.Int, option: { nullable: true } },
                            { name: "1", type: sql.Int, option: { nullable: true } }
                        ] 
    * @param {*} rowsData [
                            [1 , 2, 8, "asd"]
                        ]
     */
exports.convertArrayDataToSQLTable = function(tableName, columnsArray, rowsData) {
    let table = new sql.Table(tableName);
    table.create = true;
    for (let i = 0; i < columnsArray.length; i++) {
        let column = columnsArray[i];
        table.columns.add(column.name, column.type, column.option);
    }
    for (let i = 0; i < rowsData.length; i++) {
        count++;
        let data = rowsData[i];
        table.rows.add(...data);
    }
    return table;
};
exports.formatDate = function(dateTime) {
    return getDateStr(dateTime) + ' ' + getTimeStr(dateTime);
}
exports.getJobDateInfo = function(inputTime) {
    let jobDateInfo = {};
    let currDateTime = new Date();
    if (inputTime)
        currDateTime = inputTime;
    //DAY= 08:00~20:00, NIGHT=20:00~08:00
    let jobDateTime = dateAdd(HOUR, -8, currDateTime);
    let jobDate = getDateStr(jobDateTime);
    jobDateTime = new Date((getDateStr(jobDateTime) + ' ' + '20:00:00'));
    if (jobDateTime > currDateTime)
        jobDateInfo['jobEndDateTime'] = jobDate + ' 20:00:00';
    else
        jobDateInfo['jobEndDateTime'] = getDateStr(dateAdd(DAY, 1, jobDateTime)) + ' 08:00:00';
    jobDateInfo['jobStartDateTime'] = this.formatDate(dateAdd(HOUR, -12, jobDateInfo['jobEndDateTime']));
    //typeCodeShift
    // let jobStartDateTime = new Date(jobDateInfo['jobStartDateTime']);
    // jobDateTime = dateAdd(HOUR, -8, jobStartDateTime);
    // if (jobStartDateTime >= dateAdd(HOUR, 8, jobDateTime) && jobStartDateTime <= dateAdd(HOUR, 20, jobDateTime))
    //     jobDateInfo['typeCodeShift'] = 'SH1';
    // else
    //     jobDateInfo['typeCodeShift'] = 'SH2';
    return jobDateInfo;
}

function getDateStr(dateTime) {
    let dd = dateTime.getDate();
    let mm = dateTime.getMonth() + 1;
    let yyyy = dateTime.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    return yyyy + '-' + mm + '-' + dd;
}

function getTimeStr(dateTime) {
    let hh = dateTime.getHours();
    let mm = dateTime.getMinutes();
    let ss = dateTime.getSeconds();
    if (hh < 10)
        hh = '0' + hh;
    if (mm < 10)
        mm = '0' + mm;
    if (ss < 10)
        ss = '0' + ss;
    return hh + ':' + mm + ':' + ss;
}

function dateAdd(unit, value, dateTime) {
    let returnVal = JSON.stringify(dateTime);
    returnVal = new Date(JSON.parse(returnVal));
    switch (unit) {
        case HOUR:
            returnVal.setHours(returnVal.getHours() + value);
            break;
        case DAY:
            returnVal.setHours(returnVal.getHours() + (value * 24));
            break;
        default:
            break;
    }
    return returnVal;
}
exports.getSQLType = function(sql, typeName) {
    let upperType = typeName.toUpperCase();
    switch (upperType) {
        case 'S':
            return sql.NVarChar;
        case 'S10':
            return sql.NVarChar(10);
        case 'S20':
            return sql.NVarChar(20);
        case 'S50':
            return sql.NVarChar(50);
        case 'S100':
            return sql.NVarChar(100);
        case 'S200':
            return sql.NVarChar(200);
        case 'S512':
            return sql.NVarChar(512);
        case 'SMAX':
            return sql.Text;
        case 'N':
            return sql.Int;
        case 'B':
            return sql.Bit;
        case 'D':
            return sql.DateTime;
        case 'BUF':
            return sql.VarBinary;
        case 'T':
            return sql.TVP;
        default:
            return sql.NVarChar;
    }
}

exports.createRedisKey = function(rowData, tableName, keyFields) {
    let key = {
        rowKey: tableName,
        tableVal: rowData.keyFields[0]
    };

    for (let i in keyFields) {
        key.rowKey = key.rowKey + '_' + rowData.keyFields[i];
        if (i > 0)
            key.tableVal = key.tableVal + '_' + rowData.keyFields[i];
    }

    return key;
}