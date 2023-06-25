
import Mock, { Random } from 'mockjs';  // 引入mock核心库
import db from '../lowdb'; // 引入数据库模块
import urls from '../../src/api/url'; // 引入请求地址库
import _ from 'lodash'

// 定义数据库项——相当于一张表

export let user: any = [];

// 定义初始数据总量
const count = 2;

// 如果该表不存在或者表中没有数据，则创建新数据存储数据库，否则返回已经存在的数据
if (db && db.get('user').size().value()) {  // size()获取数据表总量
    user = db.get('user').value(); // get()...value() 从数据库获取数据  
} else {

   const user =Mock.mock({
        "user|2":[{
            'avatar': '@image(100x100)',  // 随机生成一个地名
            'userName': '@cname',  // 一个自增数
            'nickName': '',
            'password': 'qwe123',  // 中文姓名
            'phonenumber': '@integer(1,11)', // 生成一个自定义日期
            'sex|1': ['1', '0'], // 男或女
            'email': '@email', // 中文段落
            'userId|+1':1, // 指定生成某个范围内的整数
        }]
    })
   
    db.set('user', user.user).write();  // set() 新建或重写一个表， .write（）执行写入操作
}



// 导出每个接口的模拟逻辑



export default [
    // 登录
    {
        url: urls["/login"],
        type: 'post',
        isMock: true,
        response: (req: any) => {
            console.log(req);
            const body = req.body
            const flag = _.find(user, (item) => {
                return item.userName == body.username && item.password == body.password
            })
            console.log(flag);
            if (flag) {
                return {
                    code: 200,
                    msg: "登录成功",
                    userName:body.username
                }
            } else {
                return {
                    code: 400,
                    msg: '账号未注册或者密码错误'
                }
            }
        }
    },
    {
        // 先判断username和phonenumber是否被注册,再来添加信息
        url: urls["/register"],
        type: "post",
        isMock: true,
        response: (req: any) => {
            console.log(req);
            const body = req.body
            const flag = _.find(user, (item) => {
                return item.userName == body.userName || item.phonenumber == body.phonenumber
            })
            console.log(flag);
            if (flag) {
                return {
                    code: 400,
                    msg: '用户名或者密码已经被注册'
                }
            } else {
                body.userId = Random.id()
                user.unshift(body)
                db.set("user", user).write()
                return {
                    code: 200,
                    msg: "注册成功"
                }
            }
        }

    },
    {
        url:urls["/getInfo"],
        type:'get',
        isMock:true,
        response:(req)=>{
            const query=req.query
            const userInfo=_.find(user,item=>{
                return item.userName==query.userName
            })
            if(user){
                return {
                    code:200,
                    msg:'获取成功',
                    user:userInfo
                }
            }else{
                return {
                    code:400,
                    msg:'请求错误'
                }
            }
        }
       
    },
    // 修改密码
    {
        url:'/prod-api/api/common/user/resetPwd',
        type:'put',
        isMock:true,
        response:(req)=>{
            const body=req.body
            console.log(body);
            
            const flag=_.find(user,item=>{
                return item.userName=body.userName
            })
            if(flag){
                db.get("user").find({userName:body.userName}).assign({password:body.newPassword}).write()
                return {
                    code:200,
                    msg:'修改成功'
                }
            }            
        }
    },
    {
        url:'/prod-api/api/common/user',
        type:'put',
        isMock:true,
        response:(req)=>{
            const body=req.body
            console.log(body);
            
            const flag=_.find(user,item=>{
                return item.userName==body.userName
            })
            if(flag){
                db.get("user").find({userName:body.userName}).assign({...body}).write()
                return {
                    code:200,
                    msg:'修改成功'
                }
            }
        }
    }



];

