import { ADD_COUNT, CHANGE_COUNT, DESC_COUNT } from "../actions"

const count = (state = 1000, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_COUNT:
            return state + 1
            break
        case DESC_COUNT:
            return state - 1
            break
        case CHANGE_COUNT:
            return state - payload
            break
        default:
            return state
            break;
    }
}
export default count