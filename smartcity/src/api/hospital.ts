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
export const addPatientCardApi=()=>{
    return request.post("/prod-api/api/hospital/patient")
}
export const updatePatientCardApi=()=>{
    return request.put("/prod-api/api/hospital/patient")
}
