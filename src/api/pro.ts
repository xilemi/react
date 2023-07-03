import request from "../utils/request"

export const loginApi=(params:any):any=>{
    return request.post("/pro/login",params)
}



// 使用验证码登录的时候
export const getTokenApi=(params:any):any=>{
    return request.post("/pro/gettoken",params)
}
export const resetpassApi=(params:any):any=>{
    return request.post("/pro/resetpass",params)
}
export const uplodafileApi=(params:any):any=>{
    return request.post("/pro/uplodafile",params)
}
export const changeuserinfoApi=(params:any):any=>{
    return request.post("/pro/changeuserinfo",params)
}

export const getUserInfoApi=():any=>{
    return request.get("/pro/getuserinfo")
}
export const sentCaptchaApi=(params:any):any=>{
    return request.get("http://120.26.90.83:3000/captcha/sent",{params})
}
export const verifyCaptchaApi=(params:any):any=>{
    return request.get("http://120.26.90.83:3000/captcha/verify",{params})
    
    
    // 角色列表
}
export const getRoleListApi=(params:any):any=>{
    return request.post("/pro/role/list",params)
}

export const addRoleApi=(params:any):any=>{
    return request.post("/pro/role/add",params)
}

export const delRoleApi=(params:any):any=>{
    return request.post("/pro/role/delete",params)
}
export const updataRoleApi=(params:any):any=>{
    return request.post("/pro/role/update",params)
}    
    // 用户列表
    
export const getUserListApi=(params:any):any=>{
    return request.post("/pro/user/list",params)
}
export const delUserApi=(params:any):any=>{
    return request.post("/pro/user/delete",params)
}
export const updataUserApi=(params:any):any=>{
    return request.post("/pro/user/update",params)
}
//添加用户
export const createUserApi=(params:any):any=>{
    return request.post("/pro/user/create",params)
}



// 公告类型

export const updateTypeAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/type/update",params)
}
export const addTypeAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/type/add",params)
}
export const delTypeAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/type/delete",params)
}
export const listTypeAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/type/list",params)
}



// 车辆类型

export const updateCartTypeApi=(params:any):any=>{
    return request.post("/pro/cart/type/update",params)
}
export const addTypeCartApi=(params:any):any=>{
    return request.post("/pro/cart/type/add",params)
}
export const delTypeCartApi=(params:any):any=>{
    return request.post("/pro/cart/type/delete",params)
}
export const listTypeCartApi=(params:any):any=>{
    return request.post("/pro/cart/type/list",params)
}


// 建议类型

export const updateAdviseTypeApi=(params:any):any=>{
    return request.post("/pro/advise/type/update",params)
}
export const addTypeAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/type/add",params)
}
export const delTypeAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/type/delete",params)
}
export const listTypeAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/type/list",params)
}



// 公告增删改查  
export const listAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/list",params)
}
export const addAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/add",params)
}
export const delAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/delete",params)
}
export const updateAnnoApi=(params:any):any=>{
    return request.post("/pro/anno/update",params)
}



// 意见增删改查  
export const listAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/list",params)
}
export const addAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/add",params)
}
export const delAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/delete",params)
}
export const updateAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/update",params)
}
export const detailAdviseApi=(params:any):any=>{
    return request.post("/pro/advise/detail",params)
}
