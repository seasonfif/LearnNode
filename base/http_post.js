let http = require('http')
let querystring = require('querystring')
var postHTML =
    '<public><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></public>';

let server = http.createServer((req, res)=>{
    let body = "";
    req.on("data", (chunk)=>{
        body += chunk
    })

    req.on('end', ()=>{
        body = querystring.parse(body)
        res.writeHead(200, {'Content-Type':'text/public;charset=utf8'})
        if (body.name && body.url){
            res.write("网站名：" + body.name);
            res.write("<br>");
            res.write("网站 URL：" + body.url);
        }else{
            res.write(postHTML)
        }
        res.end()
    })
})
server.listen(3000)