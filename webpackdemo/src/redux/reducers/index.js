import { combineReducers } from "redux"
import count from "./count"
import msg from "./msg"
import data from "./data"
// 数据进行拆分

export const reducers = combineReducers({
    count: count,
    msg: msg,
    data: data
})