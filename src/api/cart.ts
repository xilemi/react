import request from "../utils/request"



export const listCartApi=(params:any):any=>{
    return request.post("/cart/list",params)
}
export const addCartApi=(params:any):any=>{
    return request.post("/cart/add",params)
}
export const delCartApi=(params:any):any=>{
    return request.post("/cart/delete",params)
}
export const updateCartApi=(params:any):any=>{
    return request.post("/cart/update",params)
}


// 添加订单

export const addOrderApi=(params:any):any=>{
    return request.post("/cart/order/add",params)
}
export const delOrderApi=(params:any):any=>{
    return request.post("/cart/order/delete",params)
}
export const updateOrderApi=(params:any):any=>{
    return request.post("/cart/order/update",params)
}
export const listOrderApi=(params:any):any=>{
    return request.post("/cart/order/list",params)
}

// 添加售后
export const addAftersaleApi=(params:any):any=>{
    return request.post("/cart/aftersale/add",params)
}
export const delAftersaleApi=(params:any):any=>{
    return request.post("/cart/aftersale/delete",params)
}
export const updateAftersaleApi=(params:any):any=>{
    return request.post("/cart/aftersale/update",params)
}
export const listAftersaleApi=(params:any):any=>{
    return request.post("/cart/aftersale/list",params)
}
