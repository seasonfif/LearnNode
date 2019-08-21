
process.send('hello')

process.on('message', (msg)=>{
    console.log('[Worker] Received message from master: ' + msg)
    process.send('hello father')
})