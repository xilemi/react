import request from "../utils/request"

export const getServiceListApi = () => {
    return request.get("/prod-api/api/service/list")
}