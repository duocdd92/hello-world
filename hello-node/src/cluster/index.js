const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// console.clear();
// console.count('abc');
// console.count('abc');
// console.trace('Show me');
// return;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    cluster.on('disconnect', worker => {
        console.log('worker ' + worker.process.pid + ' disconnected');
    });

    cluster.on('message', (worker, message) => {
        console.log(message)
    });

} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);

    setInterval(() => {
        console.log(`process ${process.pid} send message`);
        process.send('Hello, I am ' + process.pid);
        // process.disconnect();
    }, 1000);
}