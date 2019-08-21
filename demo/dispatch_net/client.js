const net = require('net')
const max = 10

for (let i = 0; i < max; i++) {
    net.createConnection({
        host: '127.0.0.1',
        port: 8080
    }).on('data', (data)=>{
        console.log(data.toString())
    })
}