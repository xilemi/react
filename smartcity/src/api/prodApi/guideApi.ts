import { bannersType } from "../../types";
import request from "../../utils/request";
export const getBannersApi: (params: bannersType) => any = (params: bannersType) => {
    return request.get("/prod-api/api/rotation/list", { params })
}