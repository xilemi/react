import request from "../utils/request"
export const getCategoryListApi = () => {
    return request.get("/prod-api/press/category/list")
}
export const getNewsListApi = (params) => {
    return request.get("/prod-api/press/press/list", { params })
}
// 直接传id 新闻详情
export const getNewsDetailApi = (params) => {
    return request.get("/prod-api/press/press/" + params)
}
// 评论列表
export const getNewsCommentsApi: (params: object) => any = (params) => {
    return request.get("/prod-api/press/comments/list/", { params })
}
// 评论详情
export const getNewsCommentDetailApi = (params) => {
    return request.get("/prod-api/press/comments/" + params)
}
// 新闻点赞
export const addNewsLikeApi = (params) => {
    return request.put("/prod-api/press/press/like/" + params, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 评论点赞
export const addNewsCommentLikeApi = (params) => {
    return request.put("/prod-api/press/pressComment/like/" + params, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 评论
export const addNewsCommentApi = (params) => {
    return request.post("/prod-api/press/pressComment", params, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}



