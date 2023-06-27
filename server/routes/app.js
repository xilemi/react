


var express = require('express')
var router = express.Router()
var { MsOfferModel , MsPingModel, MsCollectModel , msLikeModel , AppMsModel , BannerModel ,  AppUserModel , AppTravelModel , AppLikeModel ,AppCollectModel , AppPingModel } = require('../db/model')
var { createToken , decodeToken } = require('../utils/token')
var axios = require('axios')
var multer = require('multer')
var routes = require('../utils/routes')
var getRouterListByRole = require('../utils')
var { insertDataFromTable  , findAllDataFromTable , findOneDataFromTable , removeDataFromTable , updateDataFromTable } = require('../db/index')

var getRawBody = require("raw-body")

router.get('/getlocation',(req,res)=>{
    const query = req.query;
    axios.get('https://api.map.baidu.com/place/v2/search',{
        params:query,
    })
    .then(result=>{
        console.log(result)
        res.json({
            code:200,   
            msg:'成功',
            data:result.data,
            result:result.data 
        })
    })
    .catch(err=>{
        console.log(err)
        res.json({
            code:500,
            msg:"失败",
            err, 
        })
    })
})

router.get('/maizuo',(req,res)=>{
    var query = req.query;
    var headers = req.headers;
    axios.get('https://m.maizuo.com/gateway',{
        params:query,
        headers:{
            'x-Host':headers['x-host']
        }
    })
    .then(result=>{
        res.json({
            code:200,   
            msg:'成功',
            data:result.data.data,
            result:result.data 
        })
    })
    .catch(err=>{
        res.json({
            code:500,
            msg:"失败",
            err, 
        })
    })
})

router.get('/test',(req,res)=>{
    res.json({
        code:200,
        msg:'测试 APP项目的 接口',
        result:null 
    })
})

router.get('/banners',(req,res)=>{
    findAllDataFromTable({
        model:BannerModel,
        query:{},
        res, 
    })
})


router.post("/finduser",(req,res)=>{
    var body = req.body 
    findOneDataFromTable({
        res,
        model:AppUserModel,
        query:body
    })
})


router.post("/register",(req,res)=>{
    var body  = req.body;
    body.time = new Date;
    if(body.phone && body.password && body.username){
        insertDataFromTable({
            model:AppUserModel,
            res,
            data:body 
        })
    }else{
        res.json({
            code:400,
            msg:'参数错误',
            result:null 
        })
    }
    
})

router.post('/login',async (req,res)=>{
    var body = req.body
    let result = await findOneDataFromTable({
        model:AppUserModel,
        res,
        query:body,
        next:1
    })
    if(result){
        const token = createToken({
            username:result.username,
            phone:result.phone,
            password:result.password,
        })
        res.json({
            code:200,
            msg:'登录成功',
            result,
            token 
        })
    }else{
        res.json({
            code:401,
            msg:"用户名或者密码不匹配",
            result:null 
        })
    }
})


router.post("/gettoken",(req,res)=>{
    var body = req.body 
    const token = createToken(body)
    res.json({
        code:200,
        msg:'成功',
        token
    })
})


// 修改密码
router.post('/changepass',(req,res)=>{
    var body = req.body;
    updateDataFromTable({
        model:AppUserModel,
        res,
        query:{phone:body.phone},
        data:{
            password:body.password
        }
    })
})


router.get('/getuserinfo',(req,res)=>{
    // 根据 token username phone 
    decodeToken(req,res, async  ({ phone })=>{
        findOneDataFromTable({
            model:AppUserModel,
            query:{phone},
            res, 
        })        
    })
})

// 上传文件 
const storage = multer.diskStorage({
    //保存路径
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
      //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
    },
    //保存在 destination 中的文件名
    filename: function (req, file, cb) {    
      cb(null, "FX2301" + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).any()   // 任何文件格式 


router.post('/uplodafile',upload,(req,res)=>{
    var path = req.files[0].path 
    res.json({
        code:200,
        msg:'上传成功',
        path,
        result:path, 
    })
})


router.post("/changeuserinfo",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({phone})=>{
        updateDataFromTable({
            model:AppUserModel,
            res,
            query:{phone},
            data:body 
        })
    })
})


// blob 上传文件
// router.post("/getblobfile",(req,res)=>{
//     getRawBody(req,{
//         length: req.headers['content-length'],
//         limit: '10mb',
//         encoding: contentType.parse(req).parameters.charset
//     },(err,result)=>{
//         if(err){
//             res.json({
//                 code:501,
//                 msg:'服务器异常',
//                 err,
//             })
//         }else{
//             res.json({
//                 code:200,
//                 result,
//                 msg:'上传文件成功'
//             })
//         }
//     })
// })

// 添加面试题 
router.post("/addmainshi",(req,res)=>{
    var body = req.body;
    body.time = new Date()  // 添加时间
    decodeToken(req,res,async ({phone})=>{
        let result = await findOneDataFromTable({
            model:AppUserModel,
            res,
            query:{phone },
            next:1
        })
        body.author = result;
        body.hot = body.audioSrc ? 10 : 1; 
        insertDataFromTable({
            model:AppMsModel, // 面试表 
            res,
            data:body 
        })
    })
})

router.post("/addtravels",(req,res)=>{
    var body = req.body;
    body.time = new Date()
    decodeToken(req,res,async ({phone})=>{
        let result = await findOneDataFromTable({
            model:AppUserModel,
            res,
            query:{phone },
            next:1
        })
        body.author = result;
        body.hot = 5; 
        insertDataFromTable({
            model:AppTravelModel,
            res,
            data:body 
        })
    })
})

router.post('/getmyinterviews',(req,res)=>{
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:AppMsModel,
            res,
            query:{
                'author.phone':phone 
            },
            sort:{
                'time':-1,  // 降序
            }
        })
    })
})

router.post('/getmytravels',(req,res)=>{
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:AppTravelModel,
            res,
            query:{
                'author.phone':phone 
            },
            sort:{
                'time':-1,
            }
        })
    })
})

router.post("/getmsbyid",(req,res)=>{
    var body = req.body;
    // 没有token 
    findOneDataFromTable({
        model:AppMsModel,
        res,
        query:{
            _id:body._id 
        },
    })
})

router.post("/gettravelbyid",(req,res)=>{
    var body = req.body;
    findOneDataFromTable({
        model:AppTravelModel,
        res,
        query:{
            _id:body._id 
        },
    })
})

// 所有的面试记录数据 
router.post("/getallinters",(req,res)=>{
    var body = req.body;
    var keyword = body.keyword;
    // 分页  
    // limit 
    // pageSize 
    // 过滤 
    var query = {

    }
    if(keyword){  // 关键字 
        query={
            $or:[
                {
                    content:new RegExp(keyword),
                },
                {
                    address:new RegExp(keyword)
                },
                {
                    campany:new RegExp(keyword)
                },
                {
                    'tags.label':new RegExp(keyword)
                }
            ]
        }
        // query.campany = new RegExp(keyword)
        // query['tags.label'] = new RegExp(keyword)
    }
    console.log(query)
    findAllDataFromTable({
        
        model:AppMsModel,
        query:query,
        res,
        sort:{
            date:-1,
        }
    })
})


router.post("/gettmsbanners",(req,res)=>{
    findAllDataFromTable({
        model:AppMsModel,
        res,
        sort:{
            hot:-1
        },
        limit:5 
    })
})

router.post('/gethomelist',async (req,res)=>{
    var body = req.body;
    var sort = {
        hot:-1   // 降序  1 热度
    }
    var type = body.type  // 2 最新 时间排序   1 最热 
    var page = body.page || 1   // 默认页数 
    var pageSize = body.pageSize  || 10  // 每页多少条 
    if(type=='2'){
        sort = {
            time:-1
        }
    }

    // 查询所有的数据 
    let result = await findAllDataFromTable({
        model:AppMsModel,
        res,
        next:1,
    })  
    

    // 当前这一页的数据 
    let data = await findAllDataFromTable({
        model:AppMsModel,
        res,
        sort:sort,
        limit:pageSize,
        skip:(page-1) * pageSize,
        next:1
    })
    res.json({
        code:200,
        msg:'查询成功',
        total:result.length,
        page, 
        result:data,
        pageSize, 
    })
})

// 修改热度 
router.post("/changemshot",(req,res)=>{
    var body = req.body 
    updateDataFromTable({
        res,
        model:AppMsModel,
        query:{
            _id:body._id 
        },
        data:{
            hot:body.hot 
        },  // hot pings  likes collects 
    })
})

// 每次进来一次 hot 热度 +1
router.post("/changetravels",(req,res)=>{
    var body = req.body 
    updateDataFromTable({
        res,
        model:AppTravelModel,
        query:{
            _id:body._id 
        },
        data:body ,  // hot pings  likes collects 
    })
})


// 点赞评论收藏 
router.post("/changemsinfo",(req,res)=>{
    var body = req.body 
    updateDataFromTable({
        res,
        model:AppMsModel,
        query:{
            _id:body._id 
        },
        data:body ,  // hot pings  likes collects 
    })
})


// 判断是否已经点赞  获取点赞列表 
router.post('/getmslikes',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:msLikeModel,
            res,
            query:body, 
        })
    })  
})

// 判断是否已经点赞  获取点赞列表 
router.post('/getlikelist',(req,res)=>{
    var body = req.body;
    var sort = req.query  
    decodeToken(req,res,({phone})=>{
        
        var query = {}
        if(body.tid)  query.tid = body.tid;
        if(body.flag) query.phone = phone;
        findAllDataFromTable({
            model:AppLikeModel,
            res,
            query:query, 
            sort, 
        })
    })  
})

// 添加点赞 
router.post("/addlikeone",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{

        let userInfo = await findOneDataFromTable({
            model:AppUserModel,
            res,
            next:1,
            query:{
                phone
            }
        })

        body.userInfo = userInfo;  // phone 查询个人信息 
        insertDataFromTable({
            model:msLikeModel,
            res,
            data:body,
        })


    })
})



router.post("/dellikeone",(req,res)=>{
    var body = req.body;
    if(body.mid){
        decodeToken(req,res,({phone})=>{
            removeDataFromTable({
                model:msLikeModel,
                res,
                query:body // _id 
            })
        })
    }else{
        res.json({
            code:401,
            msg:"参数错误",
            result:null 
        })
    }
    
})



// 判断是否已经点赞  获取点赞列表 
router.post('/getcollectlist',(req,res)=>{
    var body = req.body;
    var sort = req.query  
    decodeToken(req,res,({phone})=>{
        
        findAllDataFromTable({  
            model:MsCollectModel,
            res,
            query:body,   // mid phone 
            sort, 
        })
    })  
})

router.post("/addcollectone",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{

        let userInfo = await findOneDataFromTable({
            model:AppUserModel,
            res,
            next:1,
            query:{
                phone
            }
        })
        body.userInfo = userInfo 
        insertDataFromTable({
            model:MsCollectModel,
            res,
            data:body,
        })
    })
})

router.post("/delcollectone",(req,res)=>{
    var body = req.body;
    if(body.mid){
        decodeToken(req,res,({phone})=>{
            removeDataFromTable({
                model:MsCollectModel,
                res,
                query:body 
            })
        })
    }else{
        res.json({
            code:401,
            msg:"参数错误",
            result:null 
        })
    }
})


router.post("/addpingsone",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{
        let userInfo = await findOneDataFromTable({
            model:AppUserModel,
            res,
            next:1,
            query:{
                phone
            }
        })
        body.phone = phone;
        body.userInfo = userInfo; 

        insertDataFromTable({
            model:MsPingModel,
            res,
            data:body,
        })
    })
})



router.post('/getpinglist',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({phone})=>{
        
        findAllDataFromTable({
            sort:{
                time:"-1"
            },
            model:MsPingModel,
            res,
            query:body, 
        })
    })  
})


router.get("/getmaizuo",(req,res)=>{
    // console.log(req.query)
    // console.log(req.headers) 
    axios.get('https://m.maizuo.com/gateway',{
        params:{
            ...req.query 
        },
        headers:{
            'x-host':req.headers['x-host']
        }
    }).then(result=>{
        // console.log(result)
        res.json({
            code:200,
            msg:'请求成功',
            result:result.data 
        })
    }).catch(err=>{
        // console.log(err)
        res.json({
            code:500,
            msg:'服务器异常',
            err  
        })
    })
})


router.post("/offer/add",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{
        let userInfo = await findOneDataFromTable({
            model:AppUserModel,
            res,
            next:1,
            query:{
                phone
            }
        })
        body.phone = phone;
        body.uesrInfo = userInfo; 

        insertDataFromTable({
            model:MsOfferModel,
            res,
            data:body,
        })
    })
})

router.post('/offer/mylist',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            sort:{
                time:"-1"
            },
            model:MsOfferModel,
            res,
            query:{
                phone,
                ...body
            }, 
        })
    })  
})

router.post('/offer/update',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({phone})=>{
        updateDataFromTable({
            model:MsOfferModel,
            res,
            query:{phone},
            data:body 
        })
    })  
})

router.post('/offer/remove',(req,res)=>{
    var body = req.body;
    if(body._id){
        decodeToken(req,res,({phone})=>{
            removeDataFromTable({
                model:MsOfferModel,
                res,
                query:body, 
            })
        })  
    }else{
        res.json({
            code:401,
            msg:'参数错误异常',
            result:{}
        })
    }
   
})

module.exports = router;