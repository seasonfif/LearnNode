const work_process = require('child_process')
const cpuNum = require('os').cpus().length/2

for (let i = 0; i < cpuNum; i++) {
    work_process.fork('./slave.js')
}

process.on('exit', (code)=>{
    console.log('主进程：'+process.pid+'退出，code='+code)
})