


// Node 链接MongoDB 数据库

const mongoose = require("mongoose")
const host = '0.0.0.0'
const port = 27017;
const dbname = 'xile'  // 数据库 
const user = "?"
const pass = "?"

const DB_CONN_URL = `mongodb://${host}:${port}/${dbname}`;

mongoose.connect(DB_CONN_URL,(err)=>{
    try{
        console.log('数据库链接成功 - 可以进行数据库操作了 ')
    }catch(err){
        console.log('数据库链接失败...')
    }
})