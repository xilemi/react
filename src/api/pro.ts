import request from "../utils/request"

export const loginApi=(params:any):any=>{
    return request.post("/pro/login",params)
}