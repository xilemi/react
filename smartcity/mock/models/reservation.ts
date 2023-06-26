import Mock, { Random } from 'mockjs';  // 引入mock核心库
import db from '../lowdb'; // 引入数据库模块
import _ from 'lodash'


let reservation: any = [];


if (db && db.get('reservation').size().value()) {  // size()获取数据表总量
    reservation = db.get('reservation').value(); // get()...value() 从数据库获取数据  
} else {
    // 专家和普通能同时存在
    // const reservation = Mock.mock({
    //     "reservation|20": [{
    //         "money": '@integer(1,20)',
    //         'categoryName': '@cword(4)',
    //         // "type": "@shuffle(['1', '2'], 1,2)",
    //         "type|1": ["1","2"],
    //         'id|+1': 1,
    //     }],
    // })

    db.set('reservation', reservation).write();  // set() 新建或重写一个表， .write（）执行写入操作
}


export default [
    {
        url:'/prod-api/api/hospital/remove',
        type:'post',
        isMock:true,
        response:(req)=>{
            db.get("reservation").remove({id:+req.body.id}).write()
            return {
                code:200,
                msg:'删除成功'
            }
        }
    },
    {
        url:'/prod-api/api/hospital/updata',
        type:'post',
        isMock:true,
        response:(req)=>{
            const body=req.body
            body.id=+body.id
            db.get("reservation").find({id:body.id}).assign({...body}).write()
            return {
                code:200,
                msg:'使用成功'
            }
        }
    },
    {
        url:'/prod-api/api/hospital',
        type:'post',
        isMock:true,
        response:(req)=>{
            const body=req.body
            console.log(body);
            body.id=reservation.length>0?_.first(reservation).id+1:1
            body.orderNum=Random.guid()
            body.status="1" // 1未使用  2已使用 3过期
            reservation.unshift(body)
            db.set("reservation",reservation).write()
            return {
                code:200,
                msg:'添加成功'
            }
        }
    },
    {
        url:'/prod-api/api/hospital/reservation/list',
        type:'get',
        isMock:true,
        response:(req)=>{
            console.log(req);
            const info =_.filter(reservation,item=>{
                return item.userName==req.query.userName
            })
            return {
                code:200,
                msg:'查询成功',
                data:info
            }
        }
    },
    {
        url:'/prod-api/api/hospital/reservation',
        type:'get',
        isMock:true,
        response:(req)=>{
            const query=req.query
            const info =_.find(reservation,item=>{
                return item.id==query.id
            })
            return {
                code:200,
                msg:'查询成功',
                data:info
            }
            
        }
    },


    
]