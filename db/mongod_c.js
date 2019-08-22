const util = require('util')
const mongodb = require('mongodb')
const dburl = 'mongodb://127.0.0.1:27017'

let mc = mongodb.MongoClient
mc.connect(dburl, { useNewUrlParser: true }, (err, db)=>{
    if (err) throw err
    let dbase = db.db('local')
    dbase.collection('startup_log').find({}).toArray((err, result)=>{
        if (err) throw err;
        console.log(result);
        db.close();
    })
})



