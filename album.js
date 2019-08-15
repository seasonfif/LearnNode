var http = require('http')
var fs = require('fs')
var server = http.createServer((req, res)=>{

    if (req.url == '/favicon.ico'){
        return
    }

    /*var path = './album/lvs'
    fs.stat(path, (err, stats)=>{
        if (err){
            console.error(err)
            fs.mkdir(path)
        }else{
            res.end(stats.isDirectory().toString())
        }
    })*/

    fs.readdir('./album/', (err, files)=>{
        var dirs = [];
        (function iterator(i) {
            if (i == files.length){
                console.log(dirs)
                return;
            }

            fs.stat('./album/' + files[i], (err, stats)=>{
                if (stats.isDirectory()){
                    dirs.push(files[i])
                }
                iterator(i+1)
            })
        })(0)
    })
    res.end("hello world")
})
server.listen(3000)
