/*
master创建TCP服务器并监听8080端口，收到请求后将请求分发给worker处理。
worker收到master发来的socket以后，通过socket对客户端进行响应。
为方便看到请求的处理情况，
worker给出的响应内容会说明该请求是被哪个worker处理。
 */

const child_process = require('child_process')
const net = require('net')
const cpuNum = require('os').cpus().length/2

let workers = []
let index = 0
for (let i = 0; i < cpuNum; i++) {
    workers.push(child_process.fork('./slave.js'))
    console.log('Create worker-' + workers[i].pid)
}

const server = net.createServer()
server.on('connection',(socket)=>{
    workers[index].send('socket', socket)
    index = Number.parseInt((index+1)%cpuNum)
})

server.listen(8080, ()=>{
    console.log('TCP server: 127.0.0.1:8080')
})