
const child_process = require('child_process')
const net = require('net')
const cpuNum = require('os').cpus().length/2

let workers = []
for (let i = 0; i < cpuNum; i++) {
    workers.push(child_process.fork('./slave.js'))
    console.log('Create worker-' + workers[i].pid)
}

const server = net.createServer()

// 由于master进程也会监听端口。因此需要对请求做出处理
server.on('connection', (socket) => {
    // 利用setTimeout模拟处理请求时的操作耗时
    setTimeout(() => {
        socket.end('Request handled by master')
    }, 10)
})

server.listen(8080, ()=>{
    console.log('TCP server: 127.0.0.1:8080')
    for (let i = 0; i < cpuNum; i++) {
        let worker = workers[i]
        worker.send('server', server)
        worker.on('exit', ()=>{
            console.log('Worker-' + workers.length)
            console.log('Worker-' + worker.pid + ' exited')
            worker = child_process.fork('./slave.js')
            worker.send('server', server)
        })
    }
    // server.close()
})