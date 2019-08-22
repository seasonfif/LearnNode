const cluster = require('cluster')

if (cluster.isMaster){
    const cpuNum = require('os').cpus().length/2
    for (let i = 0; i < cpuNum; i++) {
        cluster.fork()
    }

    //监听子进程创建成功
    cluster.on('online', (worker)=>{
        console.log('Create worker-' + worker.process.pid)
    })

    //监听子进程退出
    cluster.on('exit', (worker, code, signal)=>{
        console.log('[Master] worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
        cluster.fork()
    })

}else{
    const net = require('net')
    net.createServer().on('connection', (socket)=>{
        console.log("[Worker] connected:" + process.pid)
        setTimeout(()=>{
            socket.end('Request handled by worker-' + process.pid)
        }, 500)
    }).listen(8080)
}