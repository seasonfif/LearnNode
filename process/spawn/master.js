const child_process = require('child_process')

const command = 'node slave.js'

/*
    exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。
    callback ：回调函数，包含三个参数error, stdout 和 stderr。
 */
/*let work_process = child_process.exec(command, (err, stdout, stderr)=>{
    if (err){
        console.log('err>>>>>>>'+err.stack)
    }

    console.log('stdout>>>>>>>'+stdout)
    console.log('stderr>>>>>>>'+stderr)
})*/

/*
    spawn() 方法返回流 (stdout & stderr)，在进程返回大量数据时使用。进程一旦开始执行时 spawn() 就开始接收响应。
    encoding：I/O流的编码格式；
    timeout：进程超时时间；
    killSignal：当时间或者缓冲区超限时终止进程的信号；
    maxBuffer：stdout或stderr可增长的最大值；
    setsid：决定在进程中是否创建一个新的会话；
    cwd：进程的初始工作目录，为null时表示使用node的当前工作目录；
    env：进程的环境变量。
    stdio:  用于配置子进程与父进程之间建立的管道。
            默认情况下，子进程的stdin、stdout和stderr会重定向到ChildProcess对象上相应的 child.stdin、child.stdout和child.stderr流。
            这等同于将 options.stdio 设为 ['pipe', 'pipe', 'pipe']。
            这个配置不一定是数组，也可以是字符串，
            pipe == [‘pipe', 'pipe', 'pipe']
            ignore == ['ignore', 'ignore', 'ignore']
            inherit == [process.stdin, process.stdout, process.stderr] 流会定向到你系统的bash 环境中，nodejs不再接管错误、数据的处理
 */

var options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false,
    cwd: null,
    env: null
};

let work_process = child_process.spawn('node', ['slave.js'], options)
work_process.stdout.on('data', (data)=>{
    console.log('stdout>>>>>>>'+data)
})
work_process.stderr.on('data', (data)=>{
    console.log('stderr>>>>>>>'+data)
})

work_process.on('exit', (code)=>{
    console.log('子进程：'+work_process.pid+'退出，code='+code)
})