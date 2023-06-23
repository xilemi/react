import Http from "../../utils/Http"

export const getListApi = (params) => {
    return Http.get("http://localhost:3000/api/pro/list", { params })
}