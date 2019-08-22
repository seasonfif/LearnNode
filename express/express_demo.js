let express = require('express')
let bodyParser = require('body-parser');
let multer = require('multer')
let fs = require('fs')

let app = express()
var urlencodedParser = bodyParser.urlencoded()

app.use(multer({dest : '/tmp/'}).array('image'))

app.get('/', (req, res)=>{
    res.send(req.originalUrl)
})

app.get('/get.html', (req, res)=>{
    res.sendFile(__dirname + "/public/" +'get.html')
})

app.get('/post.html', (req, res)=>{
    res.sendFile(__dirname + "/public/" +'post.html')
})

app.get('/upload', (req, res)=>{
    res.sendFile(__dirname + "/public/" + 'upload.html')
})

app.get('/process_get', (req, res)=>{
    var response = {
        'first': req.query.first_name,
        'second':req.query.last_name,
    }
    console.log(response)
    res.send(JSON.stringify(response))
})

app.post('/process_post', urlencodedParser, (req, res)=>{
    var response = {
        'first': req.body.first_name,
        'second':req.body.last_name,
    }
    console.log(response)
    res.send(JSON.stringify(response))
})

app.post('/file_upload', (req, res)=>{
    console.log(req.files[0])
    var des_file = __dirname + '/' + req.files[0].originalname
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err){
                console.error(err)
            }else{
                var response = {
                    'msg':'success',
                    'name': req.files[0].originalname,
                }
                console.log(response)
                res.send(JSON.stringify(response))
            }
        })
    })
})


let server = app.listen(3000, ()=>{
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})