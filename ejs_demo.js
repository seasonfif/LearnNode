let ejs = require('ejs')

var template = "今天天气:<%- w %>"
var data = {
    'w' : '晴天'
}
var html = ejs.render(template, data)
console.log(html)