import request from "../utils/request"
export const getHospitalBannerListApi = () => {
    return request.get("/prod-api/api/hospital/banner/list")
}

export const getHospitalListApi = () => {
    return request.get("/prod-api/api/hospital/hospital/list")
}

export const getHospitalDetailApi= (params) => {
    // return request.get("/prod-api/api/hospital/hospital/"+params)
    return request.get("/prod-api/api/hospital/hospital/",{id:params})
}


export const getPatientCardListApi=(params)=>{
    return request.get("/prod-api/api/hospital/patient/list",{params})
}
export const addPatientCardApi=(params)=>{
    return request.post("/prod-api/api/hospital/patient",params)
}
export const updatePatientCardApi=(params:any)=>{
    return request.put("/prod-api/api/hospital/patient",params)
}
export const removePatientCardApi=(params:any)=>{
    return request.put("/prod-api/api/hospital/patient/remove",params)
}
export const addReservationApi=(params:any)=>{
    return request.post("/prod-api/api/hospital",params)
}
export const addReservationListApi=(params:any)=>{
    return request.get("/prod-api/api/hospital/reservation/list",{params})
}
export const getReservationDetailApi=(params:any)=>{
    return request.get("/prod-api/api/hospital/reservation",{params})
}
export const removeReservationApi=(params:any)=>{
    return request.post("/prod-api/api/hospital/remove",params)
}
export const updataReservationApi=(params:any)=>{
    return request.post("/prod-api/api/hospital/updata",params)
}
export const getHospitalDepartmentListApi=(params)=>{
    return request.get("/prod-api/api/hospital/category/list",{params})
}