import { CHANGE_DATA_FLAG, GET_LIST_ASYNC } from "../actions";
import { fromJS } from "immutable"
/* const defaultState = {
    list: [],
    flag: true
}
const data = (state = defaultState, action) => {
    const { type, payload } = action
    console.log(payload);
    switch (type) {
        case GET_LIST_ASYNC:
            return { ...state, list: payload }
            break;
        default:
            return state
            break;
    }
} */

const defaultState = fromJS({
    list: [],
    flag: true
})

const data = (state = defaultState, action) => {
    const { type, payload } = action
    console.log(state);
    switch (type) {
        case GET_LIST_ASYNC:
            return state.set("list", payload)
            break;
        case CHANGE_DATA_FLAG:
            return state.set("flag", !state.get("flag"))
            break
        default:
            return state
            break;
    }
}
export default data