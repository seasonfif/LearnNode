const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const ejs = require('ejs')
const child_process = require('child_process')

let app = express()
let server = http.createServer(app)
let io = socketio(server)

app.use(express.static('../public'))
app.set('views', path.normalize(__dirname + '/../views'))
app.engine('.html', ejs.__express);
app.set('view engine', 'ejs')
app.set('view engine', 'html')

app.get('/', (req, res)=>{
    res.render('socket_each')
})

io.on('connection', (socket)=>{
    console.log('connected')
    socket.on('disconnect', ()=>{
        console.log('disconnected')
    })

    socket.on('sentToServer', (msg)=>{
        console.log('server received: ' + msg)
        startTask()
    })
})

server.listen(3000)

function startTask() {
    let path = '/Users/apple/sogou/TestCase/'

    let options = {
        cwd : path
    }
    let worker = child_process.spawn('bash',  ['gradlew', 'build'], options,)
    worker.stdout.on('data', (data)=>{
        console.log(data.toString())
        io.emit('stdout', data.toString())
    })

    worker.stderr.on('data', (data)=>{
        console.log(data.toString())
        io.emit('stderr', data.toString())
    })

    worker.on('exit', (code)=>{
        var msg = '子进程：'+worker.pid+'退出，code='+code
        console.log(msg)
        io.emit('stdout', msg)
    })
}