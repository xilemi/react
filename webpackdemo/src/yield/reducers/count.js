import { fromJS } from "immutable";
import { ADD_COUNT, DESC_COUNT } from "../actions";
import { GET_LIST_ASYNC } from "./info";
const defaultState = {
    count: 1000,
    list: []
}
const count = (state = defaultState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_COUNT:
            return state.count++
            break;
        case DESC_COUNT:
            return state.count--
            break;
        case GET_LIST_ASYNC:
            return { ...state, list: payload }
            break;
        default:
            return state
            break;
    }
}
export default count