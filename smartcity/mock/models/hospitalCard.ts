import Mock, { Random } from 'mockjs';  // 引入mock核心库
import db from '../lowdb'; // 引入数据库模块
import _ from 'lodash'
import { user } from './user';


let hospitalCard: any = [];

if (db && db.get('hospitalCard').size().value()) {  // size()获取数据表总量
    hospitalCard = db.get('hospitalCard').value(); // get()...value() 从数据库获取数据  
} else {
    // const hospitalCard = Mock.mock({
    //     "hospitalCard|2": [{
    //         'id|+1': 1, // 指定生成某个范围内的整数
    //         "cardId": Random.id(),
    //         'imgUrl': '@image(100x100)',
    //         "name": "@cname()",
    //         "sex|1": ["1", "0"],
    //         "tel": "@integer(1,11)",
    //         "userName": "@name()",
    //         "birthday": Random.datetime("yyyy-MM-dd"),
    //         "address": `${Random.province()}-${Random.city()}-${Random.county()}`
    //     }],
    // })

    db.set('hospitalCard', hospitalCard).write();  // set() 新建或重写一个表， .write（）执行写入操作
}


export default [

    {
        url: '/prod-api/api/hospital/patient/list',
        type: "get",
        isMock: true,
        response: (req) => {
            const query = req.query
            //    校验是否登录 充当token的作用
            // 多表联查
            const flag = _.find(user, (item) => {
                return item.userName == query.userName
            })
            console.log(flag);
            if (flag) {
                const info = _.filter(hospitalCard, item => {
                    return item.userName == query.userName
                })
                if (info) {
                    return {
                        code: 200,
                        msg: "查询成功",
                        rows: info
                    }
                } else {
                    return {
                        code: 400,
                        msg: "暂无就诊卡",
                    }
                }
            } else {
                return {
                    code: 401,
                    msg: '请登录后操作'
                }
            }
        }
    },
    {
        url: '/prod-api/api/hospital/patient',
        type: "post",
        isMock: true,
        response: (req) => {
            const body = req.body
            //    校验是否登录 充当token的作用
            const flag = _.find(user, (item) => {
                return item.userName == body.userName
            })
            if (flag) {
                body.id = hospitalCard.length > 0 ? _.first(hospitalCard).id + 1 : 1
                console.log(hospitalCard);

                hospitalCard.unshift(body)
                db.set("hospitalCard", hospitalCard).write()
                return {
                    code: 200,
                    msg: "新增成功",
                }
            }
        }
    },
    {
        url: '/prod-api/api/hospital/patient/remove',
        type: "put",
        isMock: true,
        response: (req) => {
            const body = req.body
            //    校验是否登录 充当token的作用
            const flag = _.find(user, (item) => {
                return item.userName == body.userName
            })
            if (flag) {
                body.id = Number(body.id)
                db.get("hospitalCard").remove({ id: body.id }).write()
                return {
                    code: 200,
                    msg: "修改成功",
                }
            }
        }
    },




    {
        url: '/prod-api/api/hospital/patient',
        type: "put",
        isMock: true,
        response: (req) => {
            const body = req.body
            //    校验是否登录 充当token的作用
            console.log(typeof body.id);
            const flag = _.find(user, (item) => {
                return item.userName == body.userName
            })
            if (flag) {
                body.id = Number(body.id)
                db.get("hospitalCard").find({ id: body.id }).assign({ ...body }).write()
                return {
                    code: 200,
                    msg: "修改成功",
                }
            }
        }
    },


]