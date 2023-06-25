// 统一对所有接口进行mock拦截
// 统一模拟异步请求
// 统一模拟返回


import Mock from 'mockjs'; // 引入mockjs核心库
import { param2Obj } from './utils'; // 引入工具方法
// 引入各个模块的mock数据生产逻辑
import user from './models/user';
import service from './models/service';
import hospital from './models/hospital';
import hospitalCard from './models/hospitalCard';

// 上线是否需要控制mock 的开关 
// 合并所有模块
const mocks = [
    ...user,
    ...service,
    ...hospital,
    ...hospitalCard
];

// 导出mock主程序
export function mockXHR() {
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
    Mock.XHR.prototype.send = function () {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false;
            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType;
            }
        }
        this.proxy_send(...arguments);
    };

    // 模拟异步请求包装
    function XHR2ExpressReqWrap(respond:any) {
        return function (options:any) {
            let result = null;
            if (respond instanceof Function) {
                const { body, type, url } = options;
                // console.log( param2Obj(url))
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: param2Obj(url)
                });
            } else {
                result = respond;
            }
            return Mock.mock(result);
        };
    }
    // 统一添加拦截， isMock是一个开关，代表当前请求是否需要开启mock
    for (const i of mocks) {
        if (i.isMock) {
            Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response));
        }
    }
}

// 创建模拟的响应数据
const responseFake = (url:any, type:any, respond:any) => {
    return {
        url: new RegExp(`/mock${url}`),
        type: type || 'get',
        response(req:any, res:any) {
            res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond));
        }
    };
};

export default mocks.filter(route => {
    return route.isMock;
}).map(route => {
    return responseFake(route.url, route.type, route.response);
});
