import Mock, { Random } from 'mockjs';  // 引入mock核心库
import db from '../lowdb'; // 引入数据库模块
import _ from 'lodash'


let hospital: any = [];

if (db && db.get('hospital').size().value()) {  // size()获取数据表总量
    hospital = db.get('hospital').value(); // get()...value() 从数据库获取数据  
} else {
    const hospital = Mock.mock({
        "hospital|20": [{
            'imgUrl': '@image(100x100)',  // 随机生成一个地名
            'brief': '@cword(20)',  // 中文姓名
            'hospitalName': '@cword(4)', // 生成一个自定义日期
            'level|1-5': 1, // 男或女
            'id|+1': 1, // 指定生成某个范围内的整数
        }],
    })

    db.set('hospital', hospital.hospital).write();  // set() 新建或重写一个表， .write（）执行写入操作
}

export default [
    {
        // 医院列表
        url: '/prod-api/api/hospital/hospital/list',
        type: 'get',
        isMock: true,
        response: () => {
            return {
                code: 200,
                msg: "查询成功",
                rows: hospital
            }
        }
    },
    {
        // 医院轮播图
        url: '/prod-api/api/hospital/banner/list',
        type: "get",
        isMock: true,
        response: (req) => {
            return {
                code: 200,
                msg: "查询成功",
                ...Mock.mock({
                    "data|4": [{
                        "id|+1": 1,
                        "hospitalId|+1": 1,
                        'imgUrl': '@image(375x200)'
                    }]
                })
            }
        }
    },
    {
        url:'/prod-api/api/hospital/hospital',
        type:"get",
        isMock:true,
        response:(req)=>{
            const query=req.query
            const info=_.find(hospital,(item)=>{
                return item.id=query
            })
            if(info){
                return {
                    code:200,
                    msg:'查询成功',
                    data:info
                }
            }
        }
    }

]
