const mongoose = require('mongoose')
const util = require('util')
const dburl = 'mongodb://127.0.0.1/demo'
const User = mongoose.model('user', {
    name : String,
    age : Number
})

mongoose.connect(dburl, (err)=>{
    if(err){
        console.log('连接失败');
    }else{
        console.log("连接成功")
    }
})

let user = new User({
    name : 'seasonfif',
    age : 29
})

user.save().then((result)=>{
    console.log(util.inspect(result))
}, (err)=>{
    throw err
})


