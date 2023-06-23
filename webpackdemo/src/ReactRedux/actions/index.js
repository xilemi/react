import Http from "../../utils/Http"

export const ADD_COUNT = "ADD_COUNT"
export const DESC_COUNT = "DESC_COUNT"
export const CHANGE_COUNT = "CHANGE_COUNT"
export const GET_LIST_ASYNC = 'GET_LIST_ASYNC'
export const CHANGE_DATA_FLAG = "CHANGE_DATA_FLAG"
export const commenAction = (type, payload) => {
    return {
        type,
        payload
    }
}
export const asyncAction = async (type, payload) => {
    let res = await Http.get("http://localhost:3000/api/pro/list", {
        params: { count: 1, limitNum: 10 }
    })
    console.log(res.data);
    return {
        type,
        payload: res.data
    }
}