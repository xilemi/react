import { CHANGE_DATA_FLAG } from "../actions";

const defaultState = {
    flag: true,
    message: 'xile'
}

const data = (state = defaultState, action) => {
    const { type, payload } = action
    console.log(action);
    switch (type) {
        case CHANGE_DATA_FLAG:
            return Object.assign({}, state, { flag: !state.flag })
            break;
        default:
            return state
            break;
    }
}
export default data