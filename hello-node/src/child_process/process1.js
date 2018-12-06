console.log('process 1 start');
// console.log('stdin', process.stdin);
// console.log('env', process.env);
console.log('argv', process.argv);
let count = 0;
setInterval(() => {
    console.log('Process 1 is running...', ++count);
}, 1000)
setTimeout(() => {
    process.exit();
}, 3000);