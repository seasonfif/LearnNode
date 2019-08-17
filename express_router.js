let express = require('express')
let bodyParser = require('body-parser')
let app = express()

//静态网页目录中间件
app.use(express.static('./public'))

//解析post body的中间件
app.use(bodyParser.urlencoded({extended:false}))

app.set('views', 'views')
//设置模板引擎
app.set('view engine', 'ejs')

app.use('/', (req, res, next)=>{
    console.log(new Date())
    next()
})

app.use('/admin', (req, res)=>{
    res.write(req.originalUrl + '\n')
    res.write(req.baseUrl + '\n')
    res.write(req.path + '\n')
    res.end('hello world')
})

app.get('/', (req, res)=>{
    // res.send('hello world')
    res.render('index', {
        'news':['1','2','3','4']
    })
})

//http://localhost:3000/json?name=seasonfif&age=29
app.get('/json', (req, res)=>{

    var name = req.query.name
    var age = req.query.age

    res.send({
        'name':name,
        'age':age
    })
})

app.get('/form', (req, res)=>{
    res.render('form')
})

app.post('/form', (req, res)=>{
    console.log(req.body)
    res.writeHead(200, {'content-type':'text/plain;charset=utf-8'})
    res.end(req.body.title)
})

// http://localhost:3000/book/1111
app.get('/book/:id', (req, res)=>{
    res.send(req.params['id'])
})

// http://localhost:3000/book/1111
app.get('/:path1/:path2', (req, res)=>{
    res.write(req.params['path1'])
    res.write('\n')
    res.write(req.params['path2'])
    res.end()
})

app.listen(3000)