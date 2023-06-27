

var express = require('express')
var router = express.Router()
var {CommentModel , ProOfferModel }  = require('../db/model')


// req 请求对象
// res 响应对象 
router.get('/test',(req,res)=>{
    res.json({
        code:200,
        msg:"Test - 测试接口API ",
        result:null 
    })
})



router.post("/submit",(req,res)=>{
    res.json({
        code:200,
        msg:"submit - 提交成功 ",
        result:null,
        body:req.body 
    })
})


router.all('/all/:uname?',(req,res)=>{
    res.json({
        code:200,
        msg:'接受任何请求的数据 - get - post',
        query:req.query,
        body:req.body,
        url:req.url,
        headers:req.headers, 
        path:req.path,
        params:req.params 
    })
})

router.post('/comment/add',(req,res)=>{
    var body = req.body;
    if(body.title && body.content){
        CommentModel.insertMany(body)
        .then(result=>{
            res.json({
                code:200,
                msg:'添加成功',
                result 
            })
        })
        .catch(err=>{
            res.json({
                code:500,
                msg:'服务器异常',
                err 
            })
        })
    }else{
        res.json({
            code:1001,
            msg:'参数错误 - 缺少参数',
            data:body 
        })
    }
})


router.post('/comment/list',(req,res)=>{
    var body = req.body;
    CommentModel.find(body)
        .then(result=>{
            res.json({
                code:200,
                msg:'查询成功',
                result 
            })
        })
        .catch(err=>{
            res.json({
                code:500,
                msg:'服务器异常',
                err 
            })
        })
})

router.post('/comment/remove',(req,res)=>{
    var body = req.body;
    CommentModel.remove({
        _id:body._id 
    })
    .then(result=>{
        res.json({
            code:200,
            msg:'删除成功',
            result 
        })
    })
    .catch(err=>{
        res.json({
            code:500,
            msg:'服务器异常',
            err 
        })
    })
})

router.post('/comment/update',(req,res)=>{
    var body = req.body;
    CommentModel.updateMany({
        _id:body._id 
    },{
        $set:body 
    })
    .then(result=>{
        res.json({
            code:200,
            msg:'修改成功',
            result 
        })
    })
    .catch(err=>{
        res.json({
            code:500,
            msg:'服务器异常',
            err 
        })
    })
})


router.post('/offer/add',(req,res)=>{
    var body = req.body;
    if(body.offer_company && body.offer_time && body.offer_name && body.offer_salary ){
        ProOfferModel.insertMany(body)
        .then(result=>{
            res.json({
                code:200,
                msg:'添加成功',
                result 
            })
        })
        .catch(err=>{
            res.json({
                code:500,
                msg:'服务器异常',
                err 
            })
        })
    }else{
        res.json({
            code:1001,
            msg:'参数错误 - 缺少参数',
            data:body 
        })
    }
})

router.post('/offer/list',(req,res)=>{
    var body = req.body;
    ProOfferModel.find(body)
        .sort({
            _id:-1
        })
        .then(result=>{


            res.json({
                code:200,
                msg:'查询成功',
                result 
            })
        })
        .catch(err=>{
            res.json({
                code:500,
                msg:'服务器异常',
                err 
            })
        })
})

router.post('/offer/remove',(req,res)=>{
    var body = req.body;
    ProOfferModel.remove({
        _id:body._id 
    })
    .then(result=>{
        res.json({
            code:200,
            msg:'删除成功',
            result 
        })
    })
    .catch(err=>{
        res.json({
            code:500,
            msg:'服务器异常',
            err 
        })
    })
})

router.post('/offer/update',(req,res)=>{
    var body = req.body;
    ProOfferModel.updateMany({
        _id:body._id 
    },{
        $set:body 
    })
    .then(result=>{
        res.json({
            code:200,
            msg:'修改成功',
            result 
        })
    })
    .catch(err=>{
        res.json({
            code:500,
            msg:'服务器异常',
            err 
        })
    })
})


module.exports = router;