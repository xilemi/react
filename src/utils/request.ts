import axios from 'axios';
// export const baseURL = 'http://127.0.0.1:3333';
export const baseURL = 'http://admin.xilemi.me:3333';

// export const imgBaseUrl = 'http://116.62.165.233:3333'
// axios.defaults.baseURL = 'http://116.62.165.233:3333';
axios.defaults.baseURL = 'http://admin.xilemi.me:3333';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import { successMessage,failMessage, } from './message';
import { history } from 'umi';
axios.interceptors.request.use(function (config: any) {
    // 在发送请求之前做些什么 设置token
    // 有些接口不需要 token 怎么搞
    // 如果 url 是登录和注册 不配置
    // 使用useLocalStorageState 进行处理  序列化  反序列化  是不是可以在存储的时候就进行序列化
    // 为啥 取持久化的数据会有问题
    const token = eval(localStorage.getItem("token"))
    // 进入  注册登录 不需要token
    const reg = /(login|register|maizuo|captcha)/g
    if (reg.test(config.url)) {
    } else {
        config.headers.token = token;
    }
    return config;
}, function (error: any) {
    // 对请求错误做些什么
    return failMessage(error.msg)
    // return Promise.reject(error);
});


// response的响应类型如何解决
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // axios封装的对象
    // console.log("response", response);
    
    let { code, msg } = response.data
    // 这里的条件修改

    if (code == 200 ) {
        successMessage(msg)
        return response.data
    }
    // 如果确定只有200是正确的  可以 直接else  其他的code都是返回个promise
    else {
        if (code == 3001) {
            history.replace("/login")
            failMessage("请登录")
        }
        else {
             failMessage(msg)
        }
        return response.data
    }
    //后续在那个阶段进行捕获错误比较好呢
}, function (error: any) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return failMessage(error.msg)
});


export default axios


