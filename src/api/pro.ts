import request from "../utils/request"

export const loginApi=(params:any):any=>{
    return request.post("/pro/login",params)
}



// 使用验证码登录的时候
export const getTokenApi=(params:any):any=>{
    return request.post("/pro/gettoken",params)
}
export const sentCaptchaApi=(params:any):any=>{
    return request.get("http://120.26.90.83:3000/captcha/sent",{params})
}
export const verifyCaptchaApi=(params:any):any=>{
    return request.get("http://120.26.90.83:3000/captcha/verify",{params})
}
