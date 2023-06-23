import Http from "./Http";
const baseUrl = "http://127.0.0.1:3000/api"
export const listApi = () => {
    return Http.get(baseUrl + '/comment/list')
}
export const addApi = (params) => {
    return Http.post(baseUrl + '/comment/add', { params })
}
export const delApi = (params) => {
    return Http.get(baseUrl + '/comment/delete', { params })
}
export const updataApi = (params) => {
    return Http.post(baseUrl + '/comment/updata', { params })
}