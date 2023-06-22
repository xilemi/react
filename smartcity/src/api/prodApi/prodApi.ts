import request from "../../utils/request";
type paramsType = {
    pageNum: number,
    pageSize: number,
    type: number
}

export const getListApi = (params: paramsType): any => {
    return request.get("/prod-api/api/rotation/list", { params })
}

