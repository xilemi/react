
const defaultState = {
    count: 1000,
    msg: "xile"
}
export const reducer = (state = defaultState, action) => {
    // 获取action 传来的type和payload
    const { type, payload } = action
    console.log(type, payload);
    // switch type  执行对应的操作 
    switch (type) {
        case "addCount":
            state.count++
            return state
            break;
        case "descCount":
            state.count = state.count - payload
            return state
        case "changeMsg":
            state.msg = payload
            return state
        default:
            return state
            break;
    }
}