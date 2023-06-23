import { combineReducers } from "redux-immutable";
import count from "./count";
const reducer = combineReducers({
    count: count
})
export default reducer