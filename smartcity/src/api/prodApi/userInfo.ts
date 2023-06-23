import { loginType, regType } from "../../types/index"
import request from "../../utils/request"
export const loginApi: (params: loginType) => any = (params: loginType) => {
    return request.post("/prod-api/api/login", params, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}


export const regApi: (params: regType) => any = (params: regType) => {
    return request.post("/prod-api/api/register", params, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 获取用户信息 不用携带参数,带token
export const getUserInfoApi: () => any = () => {
    return request.get("/prod-api/api/common/user/getInfo")
}
// 修改密码  put 和 post 一样使用
export const resetPwdApi = (params) => {
    return request.put("/prod-api/api/common/user/resetPwd", params)
}
export const resetUserInfoApi = (params) => {
    return request.put("/prod-api/api/common/user", params)
}

export const uploadFileApi = (params) => {
    return request.post("http://116.62.165.233:3333/app/uplodafile", params)
}
