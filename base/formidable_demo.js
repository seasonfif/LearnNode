let http = require('http')
let util = require('util')
let fs = require('fs')
let path = require('path')
let sd = require('silly-datetime')
let formidable = require('formidable')

http.createServer((req, res)=>{
    if (req.url == '/upload' && req.method.toLocaleLowerCase() == 'post'){
        var form = new formidable.IncomingForm()
        form.encoding = 'utf-8'
        form.uploadDir = './album'
        form.keepExtensions = true
        var file_list = []

        form.on('file', (field, file)=> {
            file_list.push([field, file])
            res.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'})
            res.write('receive:'+ file.name +'\n')
        })

        form.parse(req, (err, fields, files)=>{
            var ran = parseInt(Math.random() * 89999 + 10000)

            file_list.forEach((value, index, array)=>{
                    // console.log(util.inspect({value: value, index: index}))
                var file = value[1]
                var file_name = file.name
                var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')
                var file_path = file.path
                var old_path = __dirname + '/' + file_path
                var new_path = __dirname  + '/album/' + ttt + '_' +ran + '_' +file_name
                fs.rename(old_path, new_path, (err)=>{
                    if (err){
                        console.error(err)
                    }else{
                        console.log('receive&rename success:'+ file_name +'\n\n')
                    }
                })
            })
            res.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'})
            res.end('upload success')
        })
        return
    }else{
        res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
        res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">'+
            'Title: <input type="text" name="title"><br>'+
            '<input type="file" name="uploads" multiple="multiple"><br>'+
            '<input type="submit" value="Upload">'+
            '</form>'
        );
    }
}).listen(3000, '127.0.0.1')