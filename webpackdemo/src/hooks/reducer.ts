import { fromJS } from "immutable";




export const defaultState = fromJS({
    count: 100,
    name: 'xile',
    age: 19
})
export const commenAction = (type, payload) => {
    return {
        type,
        payload
    }
}
export const ADD_COUNT = "ADD_COUNT"
function reducer(state, action) {
    const { type, payload } = action
    console.log(type);
    switch (type) {
        case ADD_COUNT:
            return state.set("count", state.get("count") + 1)
            break;
        default:
            return state
            break;
    }
}
export default reducer