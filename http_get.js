let http = require('http')
let url = require('url')
let util = require('util')

//http://localhost:3000/user?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com
http.createServer((req, res)=>{
    var url_path = req.url
    var parse_url = url.parse(url_path, true)
    console.log(parse_url)
    res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'})
    var params = parse_url.query
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end()
    // res.end(util.inspect(parse_url))
}).listen(3000)
console.log('Server running at http://127.0.0.1:3000/')