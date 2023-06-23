import { CHANGE_MSG } from "../actions"

const msg = (state = "xile", action) => {
    const { type, payload } = action
    switch (type) {
        case CHANGE_MSG:
            return payload
            break
        default:
            return state
            break;
    }
}
export default msg