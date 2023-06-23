export const ADD_COUNT = "ADD_COUNT"
export const DESC_COUNT = "DESC_COUNT"
export const CHANGE_COUNT = "CHANGE_COUNT"
export const CHANGE_MSG = "CHANGE_MSG"
export const CHANGE_DATA_FLAG = "CHANGE_DATA_FLAG"

// 统一type 的名字
// 可以写一个函数统一来分发  type   
/* 

action 像是 state 和 reducer 中间的分发器   确定  dispatch 使用那个改变  state 的方法

*/
export const dispatchType = (type, payload) => {
    console.log(type);
    return {
        type: type,
        payload
    }
}
export const dispatchType1 = (type, payload) => {
    console.log(type);
    return () => {
        return {
            type: type,
            payload
        }
    }
}