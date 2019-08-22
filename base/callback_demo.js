var fs = require("fs")
var hello = require('./export_fun')
var person = require('./export_module')

console.time("同步耗时")
var data = fs.readFileSync("input.txt")
console.log("同步读取："+data.toString())
console.timeEnd("同步耗时")

console.time("异步耗时")
fs.readFile("input.txt", (err, data)=>{
    if (err) return console.error(err)
    console.log("异步读取："+data.toString())
    console.timeEnd("异步耗时")
})

hello.say()
hello.listen()

var p = new person()
p.init('seasonfif', 29)
p.play()
p.sleep()

