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
 */
let work_process = child_process.spawn('node', ['slave.js'])
work_process.stdout.on('data', (data)=>{
    console.log('stdout>>>>>>>'+data)
})
work_process.stderr.on('data', (data)=>{
    console.log('stderr>>>>>>>'+data)
})

work_process.on('exit', (code)=>{
    console.log('子进程：'+work_process.pid+'退出，code='+code)
})