import { ADD_COUNT, CHANGE_COUNT, DESC_COUNT } from "../actions";

// 对于基本数据类型 更改的方式 可以不修改 
const count = (state = 1000, action) => {
    const { type, payload } = action
    console.log(type, payload);
    console.log(state);
    switch (type) {
        case ADD_COUNT:
            return state + 1
            break;
        case DESC_COUNT:
            return state - 1
            break
        case CHANGE_COUNT:
            return state + payload
            break
        default:
            return state
            break;
    }
}
export default count