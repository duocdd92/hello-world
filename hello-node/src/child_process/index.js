const { spawn, fork, execFile, exec } = require('child_process');
const fs = require('fs');
const out = fs.openSync('./info.log', 'a');
const err = fs.openSync('./err.log', 'a');

test1();

var lines = process.stdout.getWindowSize()[1];
for (var i = 0; i < lines; i++) {
    console.log('\r\n');
}

/**
 * ************************************* TEST 1 **********************************
 */
function test1() {
    const cmd = spawn('node', ['process1.js']);

    cmd.stdout.on('data', (data) => {
        console.log(`spawn() stdout: ${data}`);
    });

    cmd.stderr.on('data', (data) => {
        console.log(`spawn() stderr: ${data}`);
    });

    cmd.stdin.on('data', (data) => {
        console.log(`spawn() stdin: ${data}`);
    });

    cmd.on('close', (code) => {
        console.log(`spawn close() child process exited with code: ${code}`);
    });

    cmd.on('error', err => {
        console.log(err);
    })
}
// ********************************** END TEST 1 **********************************


/**
 * ************************************* TEST 2 **********************************
 * @description: Tạo ra 1 process con chạy trong 1 shell riêng biệt
 */

function test2() {
    exec('node process1.js x1 x2', { timeout: 2000 }, (err, stdout, stderr) => {
        if (err) console.log('exec() err:', err);
        if (stdout) console.log('exec() stdout:', stdout);
        if (stderr) console.log('exec() stderr:', stderr);
    });
}

// ********************************** END TEST 2 **********************************

/**
 * ************************************* TEST 3 **********************************
 * @description: 
 * sinh ra process con và làm cho process con tiếp tục chạy
 * trong 1 shell riêng biệt (cmd) sau khi dừng process cha             
 */

function test3() {
    const subprocess = spawn(process.argv[0], ['process1.js'], {
        detached: true,
        stdio: ['ignore', out, err]
    });

    subprocess.unref();
}
// ********************************** END TEST 3 **********************************


/**
 * ************************************* TEST 4 **********************************
 * @description: Tạo ra 1 process con chạy trong 1 shell riêng biệt
 */
// Tạo ra 1 process con nhưng ko chạy trong 1 shell
function test4() {
    execFile('node', ['process1.js', 'a1'], (error, stdout, stderr) => {
        if (error) console.log('execFile() error:', error);
        if (stdout) console.log('execFile() stdout:', stdout);
        if (stderr) console.log('execFile() stderr:', stderr);
    });
}
// ********************************** END TEST 4 **********************************

/**
 * ************************************* TEST 1 **********************************
 */
function test5() {
    const cmd = fork('node', ['process1.js']);

    cmd.stdout.on('data', (data) => {
        console.log(`spawn() stdout: ${data}`);
    });

    cmd.stderr.on('data', (data) => {
        console.log(`spawn() stderr: ${data}`);
    });

    cmd.on('close', (code) => {
        console.log(`spawn close() child process exited with code: ${code}`);
    });

    cmd.on('error', err => {
        console.log(err);
    })
}
// ********************************** END TEST 1 **********************************