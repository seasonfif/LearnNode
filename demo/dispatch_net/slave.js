
const http = require('http')
const httpServer = http.createServer((req, res)=>{
    res.end('Request handled by worker-' + process.pid)
})

process.on('message', (msg, server)=>{
    if (msg === 'server' && server){
        console.log('received:' + process.pid)
        server.on('connection', (socket)=>{
            console.log("connected:" + process.pid)
            setTimeout(()=>{
                // socket.end('Request handled by worker-' + process.pid)
                httpServer.emit('connection', socket)
            }, 500)
        })
    }
})