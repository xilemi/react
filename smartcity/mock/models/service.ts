import Mock, { Random } from 'mockjs';  // 引入mock核心库
import db from '../lowdb'; // 引入数据库模块
import _ from 'lodash'


let service: any = [];

if (db && db.get('service').size().value()) {  // size()获取数据表总量
    service = db.get('service').value(); // get()...value() 从数据库获取数据  
} else {
   const service =Mock.mock({
        "service|21":[{
            'imgUrl': '@image(100x100)',  // 随机生成一个地名
            'link': 'outpatient/hospitalList',  // 中文姓名
            'serviceName': '@word(4)', // 生成一个自定义日期
            'serviceType|1': ['便民服务', '车主服务',"其他服务"], // 男或女
            'id|+1':1, // 指定生成某个范围内的整数
        }]
    })
   
    db.set('service', service.service).write();  // set() 新建或重写一个表， .write（）执行写入操作
}

export  default[
    {
        url:'/prod-api/api/service/list',
        type:'get',
        isMock:true,
        response:()=>{
            return {
                code:200,
                msg:"查询成功",
                rows:service
            }
        }
    }

]
