// import { combineReducers } from "redux";
import { combineReducers } from "redux-immutable"
import count from "./count";
import data from "./data";
const reducers = combineReducers({
    count: count,
    data: data
})
export default reducers