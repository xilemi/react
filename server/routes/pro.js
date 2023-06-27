

var express = require('express')
var router = express.Router()
var { AppMsModel , MsOfferModel, ProOfferModel,ProUserModel , ProRoleModel , ProAnnoModel , ProAnnoTypeModel , ProClassTypeModel , AdviseModel , ProGaoModel , AppTravelModel } = require('../db/model')
var { createToken , decodeToken } = require('../utils/token')
var axios = require('axios')
var multer = require('multer')
var routes = require('../utils/routes')
var getRouterListByRole = require('../utils')
var { insertDataFromTable  , findAllDataFromTable , findOneDataFromTable , removeDataFromTable , updateDataFromTable } = require('../db/index')



router.get("/test",(req,res)=>{
    res.json({
        code:200,
        msg:'test - test - 测试接口是否成功',
        result:null 
    })
})


// 登录
router.post('/login',async (req,res)=>{
    const body = req.body;
    let result = await findOneDataFromTable({
        model:ProUserModel,
        res, 
        query:{
            $or:[
                {username:body.account },
                {phone: body.account }
            ]
        },
        next:1
    })

    if(result){
        if(result.password==body.password){
            const token = createToken({
                password:result.password,
                phone:result.phone,
                username:result.username,
            })
            res.json({
                code:200,
                msg:"登录成功", 
                result,
                token
            })
        }else{
            res.json({
                code:501,
                msg:"账号或者密码不正确,请重新再试", 
                result 
            })
        }
    }else{
        res.json({
            code:501,
            msg:"账号未注册,请重新再试", 
            result 
        })
    }
})

router.post("/finduser",async (req,res)=>{
    var body = req.body 
    let data = await findOneDataFromTable({
        res,
        model:ProUserModel,
        query:body,
        next:1
    })
    console.log(data)
    if(data){
        res.json({
            code:200,
            msg:'',
            result:data 
        })
    }else{
        res.json({
            code:401,
            msg:'用户不存在',
            result:null 
        })
    }
})


router.post('/gettoken',(req,res)=>{
    var body = req.body 
    const token = createToken(body)
    res.json({
        token,
        msg:'成功',
        result:null,
        code:200 
    })
})

router.post('/adduserone',async (req,res)=>{
    var body = req.body 
    if(body){
        if(body.phone){
            body.role = 1; 
            let result = await  findOneDataFromTable({
                model:ProUserModel,
                res,
                query:{
                    $or:[
                        {phone:body.phone},
                        {username:body.username},
                    ]
                },
                next:1 
            })
            if(result){
                res.json({
                    code:500,
                    msg:'手机号或者用户名已经被注册,请重新再试',
                    result:null 
                })
            }else{
                insertDataFromTable({
                    model:ProUserModel,
                    res,
                    data:body,
                })
            }            
        }else{
            res.json({
                code:500,
                msg:'手机号参数不能为空',
                result:null 
            })
        }
    }else{
        res.json({
            code:500,
            msg:'参数不正确',
            result:null 
        })
    }
    
})

// 找回密码 
router.post('/changepass',(req,res)=>{
    const body = req.body; 
    updateDataFromTable({
        res,
        model:ProUserModel,
        query:{
            phone:body.phone 
        },
        data:{
            password:body.password 
        }
    })
})


// 重置密码
router.post('/resetpass',(req,res)=>{

    var body = req.body;
    // 已经登录 
    decodeToken(req,res,async ({phone})=>{
        console.log(phone)
        let result = await findOneDataFromTable({
            res,
            model:ProUserModel,
            query:{
                phone,
            },
            next:1
        })
        console.log(result)
        if(result){
            if(result.password == body.oldpass){
                updateDataFromTable({
                    res,
                    model:ProUserModel,
                    query:{
                        phone
                    },
                    data:{
                        password:body.newpass  
                    }
                })
            }else{
                res.json({
                    code:501,
                    msg:'旧密码错误',
                    result:null 
                })
            }
        }else{
            res.json({
                code:501,
                msg:'未知错误,手机未注册',
                result:null 
            })
        }
    })
})


router.get('/getuserinfo',(req,res)=>{
    decodeToken(req,res,({
        phone,
    })=>{
        findOneDataFromTable({
            res,
            model:ProUserModel,
            query:{
                phone 
            }
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
      cb(null, "WH2217" + '-' + Date.now() + '-' + file.originalname)
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
            model:ProUserModel,
            res,
            query:{phone},
            data:body 
        })
    })
})



// 添加用户 
router.post('/user/create', (req,res)=>{
    var body = req.body 
    if(body){
        if(body.phone){
            decodeToken(req,res,async (data)=>{
                body.time = new Date()  // 注册时间 
                let result = await  findOneDataFromTable({
                    model:ProUserModel,
                    res,
                    query:{
                        $or:[
                            {phone:body.phone},
                            {username:body.username},
                        ]
                    },
                    next:1 
                })
                if(result){
                    res.json({
                        code:500,
                        msg:'手机号或者用户名已经被注册,请重新再试',
                        result:null 
                    })
                }else{
                    insertDataFromTable({
                        model:ProUserModel,
                        res,
                        data:body,
                    })
                }   
            })         
        }else{
            res.json({
                code:500,
                msg:'手机号参数不能为空',
                result:null 
            })
        }
    }else{
        res.json({
            code:500,
            msg:'参数不正确',
            result:null 
        })
    }
    
})

// 用户列表
router.post("/user/list",(req,res)=>{
    // 添加搜索条件 
    var body = req.body;
    var query = {}
    if(body.username){
        // query = {
        //     username:new RegExp(body.username)
        // }
        query.username = new RegExp(body.username)
    }
    if(body.phone){
        query.phone = new RegExp(body.phone)
    }
    if(body.role){
        query.role = body.role;
    }
    if(body.time){
        query.time = {
            $gte:body.time[0],
            $lte:body.time[1],
        }
    }
    console.log(query)
    
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:ProUserModel,
            res,
            query:query,
            sort:{
                _id:-1   // -1 降序  1 升序 
            }
        })
    })
})


// 删除
router.post("/user/delete",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        removeDataFromTable({
            model:ProUserModel,
            res,
            query:{
                 _id:body._id   // 唯一的主键 
            },
        })
    })
})

// 修改 
router.post("/user/update",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        updateDataFromTable({
            model:ProUserModel,
            res,
            query:{
                _id:body._id   // 唯一的主键 
            },
            data:body, 
        })
    })
})


// 角色列表
router.post("/role/list",(req,res)=>{
    var query = {}
    if(req.body.label){
        query.label = new RegExp(req.body.label)
    }
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:ProRoleModel,
            res,
            query:query,
            sort:{
                value:-1 
            }
        })
    })
})

// 删除
router.post("/role/delete",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        removeDataFromTable({
            model:ProRoleModel,
            res,
            query:{
                 _id:body._id   // 唯一的主键 
            },
        })
    })
})

// 修改 
router.post("/role/update",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        updateDataFromTable({
            model:ProRoleModel,
            res,
            query:{
                _id:body._id   // 唯一的主键 
            },
            data:body, 
        })
    })
})

// 新增 
router.post("/role/add",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,async ({phone})=>{
        let result = await findOneDataFromTable({
            model:ProRoleModel,
            res,
            query:{
                label:"管理员"   // 不能大于 管理员 
            },
            next:1 
        })

        
        let data = await findOneDataFromTable({
            model:ProRoleModel,
            res,
            query:{
                value:body.value   // 不能插入已经有的数据值  
            },
            next:1 
        }) 
        
        
        if(body.value > 9999 ){
            res.json({
                code:501,
                msg:'添加的角色等级过高,请重试',
                result:null 
            })
        }else if(data){
            res.json({
                code:501,
                msg:'当前的角色等级已存在,请你重新再试',
                result:null 
            })
        }else{
            insertDataFromTable({
                model:ProRoleModel,
                res,
                data:body
            })
        }
    })
})


// 添加公告
router.post('/anno/add',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{
        let author  = await findOneDataFromTable({
            model:ProUserModel,
            res,
            query:{
                phone  
            },
            next:1 
        })
        body.time = new Date()
        body.author = author
        insertDataFromTable({
            model:ProAnnoModel,
            res,
            data:body 
        })
    })
})

// 查询公告
router.post("/anno/list",(req,res)=>{
    var query = {}
    var body = req.body;
    if(body.title){
        query.title = new RegExp(body.title)
    }
    if(body.type){
        query.type = body.type;
    }
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:ProAnnoModel,
            res,
            query:query,
            sort:{
                _id:-1 
            }
        })
    })
})



// 删除
router.post("/anno/delete",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        removeDataFromTable({
            model:ProAnnoModel,
            res,
            query:{
                 _id:body._id   // 唯一的主键 
            },
        })
    })
})



// 修改 
router.post("/anno/update",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        updateDataFromTable({
            model:ProAnnoModel,
            res,
            query:{
                _id:body._id   // 唯一的主键 
            },
            data:body, 
        })
    })
})



// 添加公告类型
router.post('/anno/type/add',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{
        let result = await findOneDataFromTable({
            model:ProAnnoTypeModel,
            res,
            query:{
                value:body.value   
            },
            next:1 
        })
        if(result){
            res.json({
                code:501,
                msg:'当前公告分类已经存在',
                result, 
            })
        }else{
            insertDataFromTable({
                model:ProAnnoTypeModel,
                res,
                data:body 
            })
        }
    })
})

// 查询公告类型
router.post("/anno/type/list",(req,res)=>{
    var query = {}
    var body = req.body;
    if(body.label){
        query.label = new RegExp(body.label)
    }
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:ProAnnoTypeModel,
            res,
            query:query,
            sort:{
                _id:-1 
            }
        })
    })
})

// 删除
router.post("/anno/type/delete",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        removeDataFromTable({
            model:ProAnnoTypeModel,
            res,
            query:{
                 _id:body._id   // 唯一的主键 
            },
        })
    })
})

// 修改 
router.post("/anno/type/update",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        updateDataFromTable({
            model:ProAnnoTypeModel,
            res,
            query:{
                _id:body._id   // 唯一的主键 
            },
            data:body, 
        })
    })
})



// 添加旅游类型
router.post('/anno/class/add',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{
        let result = await findOneDataFromTable({
            model:ProClassTypeModel,
            res,
            query:{
                label:body.label   
            },
            next:1 
        })
        if(result){
            res.json({
                code:501,
                msg:'当前旅游分类已经存在',
                result, 
            })
        }else{
            insertDataFromTable({
                model:ProClassTypeModel,
                res,
                data:body 
            })
        }
    })
})

// 查询公告类型
router.post("/anno/class/list",(req,res)=>{
    var query = {}
    var body = req.body;
    if(body.label){
        query.label = new RegExp(body.label)
    }
    var sort = {}
    if(body.value){
        sort = {
            value:body.value
        }
    }
    decodeToken(req,res,({phone})=>{
        findAllDataFromTable({
            model:ProClassTypeModel,
            res,
            query:query,
            sort:sort, 
        })
    })
})

// 删除
router.post("/anno/class/delete",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        removeDataFromTable({
            model:ProClassTypeModel,
            res,
            query:{
                 _id:body._id   // 唯一的主键 
            },
        })
    })
})

// 修改 
router.post("/anno/class/update",(req,res)=>{
    var body = req.body 
    decodeToken(req,res,({phone})=>{
        updateDataFromTable({
            model:ProClassTypeModel,
            res,
            query:{
                _id:body._id   // 唯一的主键 
            },
            data:body, 
        })
    })
})


// 新增意见
router.post('/advise/add',(req,res)=>{
    var body = req.body;
    body.time = new Date()
    decodeToken(req,res, async ({phone})=>{
        let author = await  findOneDataFromTable({
            res,
            model:ProUserModel,
            query:{
                phone
            },
            next:1 
        })
        body.author = author;
        insertDataFromTable({
            model:AdviseModel,
            res,
            data:body 
        })
    })
})


// 列表
router.post('/advise/list',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    var type = body.type
    var date = body.date 
    if(keyword){
        query.title = new RegExp(keyword)
    }
    if(type){
        query.type = type;
    }
    if(date){
        query.time = {
            $gte:date[0],
            $lte:date[1]
        }
    }
    decodeToken(req,res, async ({phone})=>{
        findAllDataFromTable({
            model:AdviseModel,
            res,
            query:query  
        })
    })
})


// 删除
router.post('/advise/delete',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        removeDataFromTable({
            model:AdviseModel,
            res,
            query:{_id:body._id} 
        })
    })
})

// 详情
router.post('/advise/detail',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        findOneDataFromTable({
            model:AdviseModel,
            res,
            query:{_id:body._id} 
        })
    })
})

// 更新
router.post('/advise/update',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        updateDataFromTable({
            model:AdviseModel,
            res,
            query:{_id:body._id},
            data:body 
        })
    })
})


// 广告新增
router.post('/guangao/add',(req,res)=>{
    var body = req.body;
    body.time = new Date()
    decodeToken(req,res, async ({phone})=>{
        let author = await  findOneDataFromTable({
            res,
            model:ProUserModel,
            query:{
                phone
            },
            next:1 
        })
        body.author = author;
        insertDataFromTable({
            model:ProGaoModel,
            res,
            data:body 
        })
    })
})

// 列表
router.post('/guangao/list',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    var type = body.type
    var date = body.date 
    if(keyword){
        query.title = new RegExp(keyword)
    }
    if(type){
        query.type = type;
    }
    if(date){
        query.time = {
            $gte:date[0],
            $lte:date[1]
        }
    }
    decodeToken(req,res, async ({phone})=>{
        findAllDataFromTable({
            model:ProGaoModel,
            res,
            query:query  
        })
    })
})

// 删除
router.post('/guangao/delete',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        removeDataFromTable({
            model:ProGaoModel,
            res,
            query:{_id:body._id} 
        })
    })
})

// 详情
router.post('/guangao/detail',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        findOneDataFromTable({
            model:ProGaoModel,
            res,
            query:{_id:body._id} 
        })
    })
})

// 更新
router.post('/guangao/update',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        updateDataFromTable({
            model:ProGaoModel,
            res,
            query:{_id:body._id},
            data:body 
        })
    })
})

// 游记新增
router.post('/travels/add',(req,res)=>{
    var body = req.body;
    body.time = new Date()
    decodeToken(req,res, async ({phone})=>{
        let author = await  findOneDataFromTable({
            res,
            model:ProUserModel,
            query:{
                phone
            },
            next:1
        })
        body.author = author;
        insertDataFromTable({
            model:AppTravelModel,
            res,
            data:body 
        })
    })
})

// 列表
router.post('/travels/list',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    var date = body.date 
    var body = req.body;
    var sort = {
        hot:-1   // 降序  1 热度
    }
    var type = body.type  // 2 最新 时间排序   1 最热 
    if(type=='2'){
        sort = {
            time:-1
        }
    }
    if(keyword){
        query.title = new RegExp(keyword)
    }
    if(date){
        query.time = {
            $gte:date[0],
            $lte:date[1]
        }
    }
    decodeToken(req,res, async ({phone})=>{
        findAllDataFromTable({
            model:AppTravelModel,
            res,
            query:query ,
            sort 
        })
    })
})

// 删除
router.post('/travels/delete',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        removeDataFromTable({
            model:AppTravelModel,
            res,
            query:{_id:body._id} 
        })
    })
})

// 详情
router.post('/travels/detail',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        findOneDataFromTable({
            model:AppTravelModel,
            res,
            query:{_id:body._id} 
        })
    })
})

// 更新
router.post('/travels/update',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({phone})=>{
        updateDataFromTable({
            model:AppTravelModel,
            res,
            query:{_id:body._id},
            data:body 
        })
    })
})

router.post("/offer/add",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({phone})=>{
        let userInfo = await findOneDataFromTable({
            model:ProUserModel,
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

router.post('/offer/list',(req,res)=>{
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

// 添加面试题 
router.post("/addmainshi",(req,res)=>{
    var body = req.body;
    body.time = new Date()  // 添加时间
    decodeToken(req,res,async ({phone})=>{
        let result = await findOneDataFromTable({
            model:ProUserModel,
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
module.exports = router;