var events = require('events')
var emitter = new events.EventEmitter()
emitter.on('connection', ()=>{
    console.log('connection success')
    emitter.emit('receive', 1, '发射的参数')
})

emitter.on('receive', (a,b)=>{
    console.log(a)   // 1
    console.log(b)   // '发射的参数'
    console.log('receive success')
})

emitter.on('receive', (a,b)=>{
    console.log(a)   // 2
    console.log(b)   // '发射的参数'
    console.log('receive success')
})

emitter.emit('connection')