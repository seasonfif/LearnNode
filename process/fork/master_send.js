const child_process = require('child_process')
const worker = child_process.fork('./slave_send.js')
worker.send('hello son')
worker.on('message', (msg)=>{
    console.log('[Master] Received message from worker: ' + msg)
})