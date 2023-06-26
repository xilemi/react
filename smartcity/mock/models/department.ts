import Mock, { Random } from 'mockjs';  // 引入mock核心库
import db from '../lowdb'; // 引入数据库模块
import _ from 'lodash'


let department: any = [];

if (db && db.get('department').size().value()) {  // size()获取数据表总量
    department = db.get('department').value(); // get()...value() 从数据库获取数据  
} else {
    // 专家和普通能同时存在
    const department = Mock.mock({
        "department|20": [{
            "money": '@integer(1,20)',
            'categoryName': '@cword(4)',
            // "type": "@shuffle(['1', '2'], 1,2)",
            "type|1": ["1","2"],
            'categoryId|+1': 1,
        }],
    })

    db.set('department', department.department).write();  // set() 新建或重写一个表， .write（）执行写入操作
}


export default [

    {
        url: '/prod-api/api/hospital/category/list',
        type: 'get',
        isMock: true,
        response: (req) => {
            const query = req.query
            console.log(query);
            const info = _.filter(department, item => {
                return item.type.indexOf(query.type) > -1
            })
            console.log(info);

            return {
                code: 200,
                msg: '查询成功',
                rows: info
            }
        }
    }
]