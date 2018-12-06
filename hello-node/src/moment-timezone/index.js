const moment = require('moment');
let unix = moment().unix(new Date());
let utc = moment.utc(unix).format()
let local = moment(utc).local().format();

let time = moment.utc().unix();
let cs = 7 * `TP${time}`.substr(1, 1).charCodeAt(0) + 9 * (parseInt(`TP${time}`.substr(6, 3)) + 1967);
// console.log(`payref=TP${time}&cs=${cs}`);
console.log(`TP${time}`)
console.log(cs)

// let date = moment('2016-d', 'YYYY-MM-DD hh:MM:ss', true);
// console.log(moment.utc(new Date()).format('YYYY-MM-DD'));
// console.log(utc)
// console.log(date.isValid());
// console.log(`${new Date(local).getHours()}:${new Date(local).getMinutes()}`)

// let start = moment().valueOf();
// console.log(moment('2020-11-10T23:49:38.000Z').format());
// console.log(moment('2018-11-24').unix())
// console.log(moment('2019-04-13').unix())
var date1 = moment(moment.utc().format('YYYY-MM-DD'));
var date2 = moment(moment.unix(1573784299).utc().format('YYYY-MM-DD'));
var diff = date2.diff(date1, 'days');
// console.log(moment().unix())
// let date1 = moment('2018-09-28 18:47:29', 'YYYY-MM-DD hh:MM:ss', true);
// console.log(date1.isValid())
// console.log(moment.unix(4102412053).format('YYYY-MM-DD'));
// console.log(moment.unix(1544954030).utc().format('YYYY-MM-DD HH:mm:ss Z'))
// console.log(moment('2099-01-01').unix())
console.log(moment('2018-01-01').format('LL'))
// console.log(moment.unix(moment.utc().unix()).format('YYYY-MM-DD'))
// console.log('2018-11-07' > '2018-11-08')
// let date = new Date('2018-11-07');
// date.setDate(date.getDate() + 30);
// console.log(moment.unix(1573293036).format('LL'))
var startdate = "2018-01-01";
var new_date = moment(moment().format(), "YYYY-MM-DD").add('days', -15).format('LL');
console.log(moment(moment.utc().format(), "YYYY-MM-DD").add('days', -10).format('YYYY-MM-DD'))
